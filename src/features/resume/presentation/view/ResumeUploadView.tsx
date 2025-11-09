import React, { useRef, useEffect, type ChangeEvent, type JSX } from "react";
import { useResumeUpload, type FieldState } from "../viewModel/useResumeUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Check,
  Loader2,
  Sparkles,
  User,
  Mail,
  Briefcase,
  Code,
  MapPin,
  Phone,
  GraduationCap,
  Building2,
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle,
  Calendar,
  type LucideIcon,
} from "lucide-react";

const FIELD_ICONS: Record<string, LucideIcon> = {
  name: User,
  email: Mail,
  phone: Phone,
  location: MapPin,
  experience_years: Briefcase,
  skills: Code,
  education: GraduationCap,
  experience: Building2,
  date_of_birth: Calendar,
  dob: Calendar,
};

interface FieldCardProps {
  field: FieldState;
  isActive: boolean;
  onConfirm: (fieldName: string, value: string | string[]) => void;
  onSkip: (fieldName: string) => void;
}

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  isActive,
  onConfirm,
  onSkip,
}) => {
  const [localValue, setLocalValue] = React.useState<string | string[]>(
    field.value
  );
  const Icon: LucideIcon = FIELD_ICONS[field.name] || FileText;

  React.useEffect(() => {
    if (isActive && field.status === "pending") {
      console.log("🔥 Activating field:", field.name);
    }
  }, [isActive, field.status, field.name]);

  const handleCheckboxChange = (
    optionValue: string,
    checked: boolean
  ): void => {
    const currentValues = Array.isArray(localValue) ? localValue : [];
    if (checked) {
      setLocalValue([...currentValues, optionValue]);
    } else {
      setLocalValue(currentValues.filter((v) => v !== optionValue));
    }
  };

  const isValueEmpty = (): boolean => {
    if (Array.isArray(localValue)) {
      return localValue.length === 0;
    }
    return !localValue || localValue?.trim() === "";
  };

  const renderInput = (): JSX.Element => {
    const fieldType = field.fieldType || "text";

    switch (fieldType) {
      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Select {field.name.replace("_", " ")}
            </Label>
            <Select
              value={typeof localValue === "string" ? localValue : ""}
              onValueChange={(value: string) => setLocalValue(value)}
            >
              <SelectTrigger
                id={field.name}
                className="border-2 border-primary/50"
              >
                <SelectValue
                  placeholder={`Select ${field.name.replace("_", " ")}`}
                />
              </SelectTrigger>
              <SelectContent>
                {field.suggestions?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.name}>{field.name.replace("_", " ")}</Label>
            <Input
              id={field.name}
              type="date"
              value={typeof localValue === "string" ? localValue : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocalValue(e.target.value)
              }
              className="border-2 border-primary/50"
              autoFocus
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Enter your {field.name.replace("_", " ")}
            </Label>
            <Textarea
              id={field.name}
              value={typeof localValue === "string" ? localValue : ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setLocalValue(e.target.value)
              }
              placeholder={`Enter your ${field.name.replace("_", " ")}`}
              className="border-2 border-primary/50 min-h-[100px]"
              autoFocus
            />
          </div>
        );

      case "multiselect":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Select {field.name.replace("_", " ")}
            </Label>
            <div className="border-2 border-primary/50 rounded-lg p-3 max-h-[200px] overflow-y-auto">
              {field.suggestions?.map((opt) => {
                const currentValues = Array.isArray(localValue)
                  ? localValue
                  : [];
                const isChecked = currentValues.includes(opt.value);

                return (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 py-2 cursor-pointer hover:bg-muted rounded px-2"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleCheckboxChange(opt.value, e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      default: // text
        return (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Enter your {field.name.replace("_", " ")}
            </Label>
            <Input
              id={field.name}
              type="text"
              value={typeof localValue === "string" ? localValue : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocalValue(e.target.value)
              }
              placeholder={`Enter your ${field.name.replace("_", " ")}`}
              className="border-2 border-primary/50"
              autoFocus
            />
          </div>
        );
    }
  };

  const getDisplayValue = (): string => {
    if (field.suggestions && typeof localValue === "string") {
      const matchedOption = field.suggestions.find(
        (s) => s.value === localValue
      );
      return matchedOption?.label || localValue;
    }

    if (Array.isArray(localValue)) {
      const displayItems = localValue.slice(0, 3);
      const remaining = localValue.length - 3;
      return (
        displayItems.join(", ") + (remaining > 0 ? ` +${remaining} more` : "")
      );
    }

    return localValue || field.value?.toString() || "N/A";
  };

  return (
    <div
      className={`mb-4 p-5 rounded-xl border-2 transition-all duration-300 ${
        isActive && field.status === "active"
          ? "border-primary shadow-lg bg-primary/5 scale-[1.02]"
          : field.status === "confirmed"
            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
            : field.status === "skipped"
              ? "border-muted bg-muted/50 opacity-60"
              : "border-border bg-card"
      }`}
    >
      {/* AI Message */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md ${
            isActive && field.status === "active" ? "animate-pulse" : ""
          }`}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium leading-relaxed">
            {field.message}
          </p>
          {field.confidence > 0 && field.confidence < 1 && (
            <div className="mt-2 flex items-center gap-2">
              <Progress value={field.confidence * 100} className="h-1.5" />
              <span className="text-xs text-muted-foreground">
                {Math.round(field.confidence * 100)}% confident
              </span>
            </div>
          )}
        </div>
        <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>

      {/* Input Section - Only show if active */}
      {isActive && field.status === "active" && (
        <div className="ml-12 space-y-3 animate-in slide-in-from-top duration-300">
          {renderInput()}

          <div className="flex gap-2">
            <Button
              onClick={() => onConfirm(field.name, localValue)}
              disabled={isValueEmpty()}
              className="flex-1 group"
            >
              <Check className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Looks good!
            </Button>
            {!field.required && (
              <Button onClick={() => onSkip(field.name)} variant="ghost">
                Skip
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Confirmed State */}
      {field.status === "confirmed" && (
        <div className="ml-12 flex items-center gap-2 text-green-700 dark:text-green-400 font-medium animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">{getDisplayValue()}</span>
        </div>
      )}

      {/* Skipped State */}
      {field.status === "skipped" && (
        <div className="ml-12 flex items-center gap-2 text-muted-foreground italic">
          <Circle className="w-4 h-4" />
          <span>Skipped</span>
        </div>
      )}
    </div>
  );
};

const ResumeUploadView: React.FC = () => {
  const {
    uploadResume,
    isUploading,
    confirmField,
    skipField,
    reset,
    fields,
    currentFieldIndex,
    jobStatus,
    jobId,
    fileName,
  } = useResumeUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fields, currentFieldIndex]);

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadResume(file);
  };

  const handleFileButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const getProfileCompletion = (): number => {
    const confirmed = fields.filter((f) => f.status === "confirmed").length;
    const required = fields.filter((f) => f.required).length;
    return required > 0 ? Math.round((confirmed / required) * 100) : 0;
  };

  const getConfirmedFields = (): FieldState[] => {
    return fields.filter((f) => f.status === "confirmed");
  };

  const getRequiredFieldsCount = (): number => {
    return fields.filter((f) => f.required).length;
  };

  const getConfirmedFieldsCount = (): number => {
    return fields.filter((f) => f.status === "confirmed").length;
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <style>{`
                @keyframes slide-in-from-top {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Smart Registration
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload your resume and let's build your profile together
        </p>
      </div>

      {/* Upload Stage */}
      {jobStatus === "idle" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6 py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-semibold mb-2">
                  Upload Your Resume
                </h2>
                <p className="text-muted-foreground mb-6">
                  We'll use AI to extract your information and guide you through
                  completing your profile
                </p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,image/jpeg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                size="lg"
                onClick={handleFileButtonClick}
                className="w-48"
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploading Stage */}
      {jobStatus === "uploading" && (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Uploading...</h2>
            <p className="text-muted-foreground">{fileName}</p>
          </CardContent>
        </Card>
      )}

      {/* Parsing Stage */}
      {jobStatus === "parsing" && fields.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="w-20 h-20 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">
              Reading your resume...
            </h2>
            <p className="text-muted-foreground text-lg">
              Our AI is extracting your information
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversational Stage */}
      {(jobStatus === "conversational" ||
        (jobStatus === "parsing" && fields.length > 0)) && (
        <Card>
          <CardHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle>Building Your Profile</CardTitle>
                <Badge variant="secondary">
                  {getConfirmedFieldsCount()} / {getRequiredFieldsCount()}{" "}
                  required
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={getProfileCompletion()} />
                <p className="text-sm text-muted-foreground">
                  {getProfileCompletion()}% complete
                </p>
              </div>
              {jobId && (
                <Badge variant="outline" className="text-xs">
                  Job ID: {jobId}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <FieldCard
                  key={field.suggestionId}
                  field={field}
                  isActive={index === currentFieldIndex}
                  onConfirm={confirmField}
                  onSkip={skipField}
                />
              ))}

              {jobStatus === "parsing" && (
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg animate-pulse">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">
                    Processing more fields...
                  </span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Stage */}
      {jobStatus === "complete" && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">
              Profile Complete! 🎉
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your profile has been successfully created
            </p>

            <Card className="max-w-lg mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-center">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getConfirmedFields().map((field) => {
                  const Icon: LucideIcon = FIELD_ICONS[field.name] || FileText;
                  const displayValue = Array.isArray(field.value)
                    ? field.value.slice(0, 5).join(", ") +
                      (field.value.length > 5 ? "..." : "")
                    : field.value?.toString().slice(0, 100) || "N/A";

                  return (
                    <div
                      key={field.name}
                      className="flex items-center gap-3 py-3 border-b last:border-0"
                    >
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <span className="text-sm text-muted-foreground capitalize block">
                          {field.name.replace("_", " ")}
                        </span>
                        <span className="font-medium text-sm">
                          {displayValue}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Button onClick={reset} size="lg">
              Upload Another Resume
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error Stage */}
      {jobStatus === "error" && (
        <Card>
          <CardContent className="py-12">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                An error occurred while processing your resume. Please try
                again.
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <Button onClick={reset} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeUploadView;
