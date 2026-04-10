import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Braces,
  Table,
  FileCode,
  CheckCircle2,
  Loader2,
  Upload,
  Download,
  Copy,
  Check,
  FileJson,
  FileText,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const defaultData = {
  json: `{
  "users": [
    {
      "id": 1,
      "name": "Олександр Коваленко",
      "email": "oleksandr@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Марія Шевченко",
      "email": "maria@example.com",
      "role": "user"
    }
  ]
}`,
  csv: `id,name,email,role
1,Олександр Коваленко,oleksandr@example.com,admin
2,Марія Шевченко,maria@example.com,user
3,Іван Петренко,ivan@example.com,editor`,
  xml: `<users>
  <user id="1">
    <name>Олександр Коваленко</name>
    <email>oleksandr@example.com</email>
    <role>admin</role>
  </user>
  <user id="2">
    <name>Марія Шевченко</name>
    <email>maria@example.com</email>
    <role>user</role>
  </user>
</users>`,
};

type InputFormat = 'json' | 'csv' | 'xml';
type OutputFormat = 'json' | 'csv' | 'table';

interface ParsedData {
  records: Record<string, unknown>[];
  schema: Record<string, string>;
  errors: string[];
}

export const DemoSection: React.FC = () => {
  const [inputFormat, setInputFormat] = useState<InputFormat>('json');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('json');
  const [inputData, setInputData] = useState(defaultData.json);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState<ParsedData | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputFormats = [
    { id: 'json', label: 'JSON', icon: Braces },
    { id: 'csv', label: 'CSV', icon: Table },
    { id: 'xml', label: 'XML', icon: FileCode },
  ] as const;

  const outputFormats = [
    { id: 'json', label: 'JSON', icon: FileJson },
    { id: 'csv', label: 'CSV', icon: FileText },
    { id: 'table', label: 'Таблиця', icon: Table },
  ] as const;

  const handleInputFormatChange = (format: InputFormat) => {
    setInputFormat(format);
    setInputData(defaultData[format]);
    setParsedResult(null);
    setUploadedFileName(null);
  };

  const parseJSON = (data: string): ParsedData => {
    const parsed = JSON.parse(data);
    const records = Array.isArray(parsed) ? parsed : parsed.users || parsed.data || [parsed];
    const schema: Record<string, string> = {};
    
    if (records.length > 0) {
      Object.entries(records[0]).forEach(([key, value]) => {
        if (typeof value === 'number') schema[key] = 'number';
        else if (typeof value === 'boolean') schema[key] = 'boolean';
        else if (typeof value === 'string' && value.includes('@')) schema[key] = 'email';
        else schema[key] = 'string';
      });
    }
    
    return { records, schema, errors: [] };
  };

  const parseCSV = (data: string): ParsedData => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const records: Record<string, unknown>[] = [];
    const errors: string[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push(`Рядок ${i + 1}: неправильна кількість стовпців`);
        continue;
      }
      const record: Record<string, unknown> = {};
      headers.forEach((header, index) => {
        const value = values[index];
        record[header] = isNaN(Number(value)) ? value : Number(value);
      });
      records.push(record);
    }
    
    const schema: Record<string, string> = {};
    headers.forEach(header => {
      const sampleValue = records[0]?.[header];
      if (typeof sampleValue === 'number') schema[header] = 'number';
      else if (String(sampleValue).includes('@')) schema[header] = 'email';
      else schema[header] = 'string';
    });
    
    return { records, schema, errors };
  };

  const parseXML = (data: string): ParsedData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/xml');
    const records: Record<string, unknown>[] = [];
    const errors: string[] = [];
    
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      errors.push('Помилка парсингу XML');
      return { records: [], schema: {}, errors };
    }
    
    const items = doc.querySelectorAll('user, item, record, entry');
    items.forEach((item) => {
      const record: Record<string, unknown> = {};
      
      // Get attributes
      Array.from(item.attributes).forEach(attr => {
        const value = attr.value;
        record[attr.name] = isNaN(Number(value)) ? value : Number(value);
      });
      
      // Get child elements
      Array.from(item.children).forEach(child => {
        const value = child.textContent || '';
        record[child.tagName] = isNaN(Number(value)) ? value : Number(value);
      });
      
      records.push(record);
    });
    
    const schema: Record<string, string> = {};
    if (records.length > 0) {
      Object.entries(records[0]).forEach(([key, value]) => {
        if (typeof value === 'number') schema[key] = 'number';
        else if (String(value).includes('@')) schema[key] = 'email';
        else schema[key] = 'string';
      });
    }
    
    return { records, schema, errors };
  };

  const handleParse = () => {
    setIsParsing(true);
    setParsedResult(null);
    
    setTimeout(() => {
      try {
        let result: ParsedData;
        
        switch (inputFormat) {
          case 'json':
            result = parseJSON(inputData);
            break;
          case 'csv':
            result = parseCSV(inputData);
            break;
          case 'xml':
            result = parseXML(inputData);
            break;
          default:
            result = { records: [], schema: {}, errors: ['Невідомий формат'] };
        }
        
        setParsedResult(result);
        
        if (result.errors.length > 0) {
          toast.warning('Парсинг завершено з попередженнями');
        } else {
          toast.success(`Успішно розпарсено ${result.records.length} записів`);
        }
      } catch (error) {
        setParsedResult({
          records: [],
          schema: {},
          errors: [error instanceof Error ? error.message : 'Помилка парсингу']
        });
        toast.error('Помилка парсингу даних');
      } finally {
        setIsParsing(false);
      }
    }, 800);
  };

  const formatOutput = (): string => {
    if (!parsedResult || parsedResult.records.length === 0) return '';
    
    switch (outputFormat) {
      case 'json':
        return JSON.stringify(parsedResult.records, null, 2);
      case 'csv':
        const headers = Object.keys(parsedResult.records[0]);
        const rows = parsedResult.records.map(record => 
          headers.map(h => String(record[h])).join(',')
        );
        return [headers.join(','), ...rows].join('\n');
      default:
        return JSON.stringify(parsedResult.records, null, 2);
    }
  };

  const handleCopy = async () => {
    const output = formatOutput();
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Скопійовано в буфер обміну');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const output = formatOutput();
    const extension = outputFormat === 'csv' ? 'csv' : 'json';
    const mimeType = outputFormat === 'csv' ? 'text/csv' : 'application/json';
    
    const blob = new Blob([output], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parsed-data.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`Файл parsed-data.${extension} завантажено`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputData(content);
      setUploadedFileName(file.name);
      setParsedResult(null);
      
      // Auto-detect format
      if (file.name.endsWith('.json')) {
        setInputFormat('json');
      } else if (file.name.endsWith('.csv')) {
        setInputFormat('csv');
      } else if (file.name.endsWith('.xml')) {
        setInputFormat('xml');
      }
      
      toast.success(`Файл "${file.name}" завантажено`);
    };
    reader.readAsText(file);
  };

  const clearUpload = () => {
    setUploadedFileName(null);
    setInputData(defaultData[inputFormat]);
    setParsedResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderTableOutput = () => {
    if (!parsedResult || parsedResult.records.length === 0) return null;
    const headers = Object.keys(parsedResult.records[0]);
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {headers.map(header => (
                <th key={header} className="text-left py-2 px-3 text-muted-foreground font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedResult.records.map((record, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-secondary/30">
                {headers.map(header => (
                  <td key={header} className="py-2 px-3">
                    {String(record[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section id="demo" className="py-24 relative bg-surface-1/30">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="container relative px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Спробуйте <span className="gradient-text">прямо зараз</span>
          </h2>
          <p className="text-muted-foreground">
            Вставте свої дані або завантажте файл — отримайте структурований результат
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="glass-card glow-border overflow-hidden">
            {/* Top toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border/50">
              {/* Input format tabs */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Вхідний формат:</span>
                {inputFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleInputFormatChange(format.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      inputFormat === format.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <format.icon className="h-4 w-4" />
                    {format.label}
                  </button>
                ))}
              </div>

              {/* File upload */}
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv,.xml,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                {uploadedFileName ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="max-w-32 truncate">{uploadedFileName}</span>
                    <button onClick={clearUpload} className="hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Завантажити файл
                  </label>
                )}
              </div>
            </div>

            {/* Content area */}
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
              {/* Input */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Вхідні дані</h3>
                  <span className="text-xs text-muted-foreground/60">Редагуйте або вставте свої дані</span>
                </div>
                <textarea
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                    setParsedResult(null);
                  }}
                  className="w-full h-[350px] p-4 bg-transparent border border-border/50 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  placeholder="Вставте ваші дані сюди..."
                  spellCheck={false}
                />
              </div>

              {/* Output */}
              <div className="p-6 bg-surface-0/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Результат</h3>
                    {parsedResult && parsedResult.records.length > 0 && (
                      <div className="flex items-center gap-1">
                        {outputFormats.map((format) => (
                          <button
                            key={format.id}
                            onClick={() => setOutputFormat(format.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 text-xs rounded transition-colors ${
                              outputFormat === format.id
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                            }`}
                          >
                            <format.icon className="h-3 w-3" />
                            {format.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {parsedResult && parsedResult.records.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                      >
                        {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                        {copied ? 'Скопійовано' : 'Копіювати'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        Завантажити
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="h-[350px] p-4 bg-surface-1 border border-border/50 rounded-lg overflow-auto text-foreground">
                  {!parsedResult && !isParsing && (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p className="text-sm text-center">
                        Вставте дані зліва та натисніть "Парсити"
                      </p>
                    </div>
                  )}
                  
                  {isParsing && (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                      <p className="text-sm">Аналізуємо структуру даних...</p>
                    </div>
                  )}

                  {parsedResult && (
                    <div className="animate-fade-in">
                      {parsedResult.errors.length > 0 && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                          <p className="text-sm text-destructive font-medium mb-1">Помилки:</p>
                          <ul className="text-xs text-destructive/80">
                            {parsedResult.errors.map((error, i) => (
                              <li key={i}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {parsedResult.records.length > 0 && (
                        <>
                          {/* Schema info */}
                          <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <span className="text-sm font-medium">Розпізнана схема</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(parsedResult.schema).map(([key, type]) => (
                                <span key={key} className="text-xs px-2 py-1 bg-surface-2 rounded">
                                  <span className="text-primary">{key}</span>
                                  <span className="text-muted-foreground">: {type}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="flex gap-6 mb-4 pb-4 border-b border-border/30">
                            <div>
                              <span className="text-xs text-muted-foreground">Записів:</span>
                              <p className="text-lg font-semibold text-primary">{parsedResult.records.length}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Полів:</span>
                              <p className="text-lg font-semibold text-primary">{Object.keys(parsedResult.schema).length}</p>
                            </div>
                          </div>
                          
                          {/* Output data */}
                          {outputFormat === 'table' ? (
                            renderTableOutput()
                          ) : (
                            <pre className="font-mono text-xs whitespace-pre-wrap">
                              {formatOutput()}
                            </pre>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between p-4 border-t border-border/50 bg-surface-1/50">
              <div className="text-sm text-muted-foreground">
                Підтримуються: JSON, CSV, XML
              </div>
              <Button 
                variant="hero" 
                onClick={handleParse}
                disabled={isParsing || !inputData.trim()}
                className="gap-2"
              >
                {isParsing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Обробка...
                  </>
                ) : (
                  <>
                    Парсити
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};