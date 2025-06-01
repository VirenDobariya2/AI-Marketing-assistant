"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, FileSpreadsheet, Check, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function ImportContactsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("csv")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadError(false)
    }
  }

  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/contacts">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Import Contacts</h2>
          <p className="text-muted-foreground">Add contacts to your audience from a file or other sources</p>
        </div>
      </div>

      <Tabs defaultValue="csv" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="csv" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span>CSV File</span>
          </TabsTrigger>
          <TabsTrigger value="copy-paste" className="flex items-center gap-2">
            <span>Copy & Paste</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <span>API Integration</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="csv" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                Import contacts from a CSV file. Your file should include headers for email, name, and any other fields.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isUploading && !uploadComplete && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Drag and drop your CSV file here</h3>
                    <p className="text-sm text-muted-foreground">or click to browse your files</p>
                  </div>
                  <Input type="file" accept=".csv" className="hidden" id="csv-upload" onChange={handleFileChange} />
                  <Label
                    htmlFor="csv-upload"
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Browse Files
                  </Label>
                  {file && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span>{file.name}</span>
                    </div>
                  )}
                </div>
              )}

              {isUploading && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="text-sm font-medium">{file?.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Uploading and processing your file. This may take a moment...
                  </p>
                </div>
              )}

              {uploadComplete && (
                <Alert className="bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-900/30">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-600 dark:text-green-400">Upload Complete</AlertTitle>
                  <AlertDescription className="text-green-600/90 dark:text-green-400/90">
                    Your file has been uploaded and processed successfully. 248 contacts were imported.
                  </AlertDescription>
                </Alert>
              )}

              {uploadError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Upload Failed</AlertTitle>
                  <AlertDescription>
                    There was an error uploading your file. Please check the file format and try again.
                  </AlertDescription>
                </Alert>
              )}

              <Alert className="bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-600 dark:text-blue-400">CSV Format</AlertTitle>
                <AlertDescription className="text-blue-600/90 dark:text-blue-400/90">
                  Your CSV file should include the following headers: email (required), first_name, last_name, phone,
                  and any custom fields.
                  <a href="#" className="ml-1 underline">
                    Download a sample CSV template
                  </a>
                  .
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/contacts")}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || isUploading || uploadComplete}>
                {isUploading ? "Uploading..." : uploadComplete ? "Uploaded" : "Upload File"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="copy-paste" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Copy & Paste Contacts</CardTitle>
              <CardDescription>Paste a list of contacts from a spreadsheet or text file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contacts">Paste Contacts</Label>
                <textarea
                  id="contacts"
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="email,first_name,last_name,phone
john@example.com,John,Doe,+1234567890
sarah@example.com,Sarah,Smith,+0987654321"
                ></textarea>
                <p className="text-sm text-muted-foreground">
                  Format: email, first_name, last_name, phone (comma-separated)
                </p>
              </div>

              <Alert className="bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-600 dark:text-blue-400">Format Example</AlertTitle>
                <AlertDescription className="text-blue-600/90 dark:text-blue-400/90">
                  Each contact should be on a new line with values separated by commas. The first line should contain
                  headers.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/contacts")}>
                Cancel
              </Button>
              <Button>Import Contacts</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>Import contacts from third-party services using our API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H9.2C8.07989 4 7.51984 4 7.09202 4.21799C6.71569 4.40973 6.40973 4.71569 6.21799 5.09202C6 5.51984 6 6.0799 6 7.2V8M6 8H18M6 8H4M18 8H20M9 12H15M9 16H15M19 21V11C19 10.0572 19 9.58579 18.7071 9.29289C18.4142 9 17.9428 9 17 9H7C6.05719 9 5.58579 9 5.29289 9.29289C5 9.58579 5 10.0572 5 11V21H19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">Mailchimp</h3>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M17.5 8.5L17.5 8.51"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">HubSpot</h3>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 13.5L13 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">Salesforce</h3>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-medium">Salesforce</h3>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-medium">Salesforce</h3>
                  <Button variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Connect to API</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
