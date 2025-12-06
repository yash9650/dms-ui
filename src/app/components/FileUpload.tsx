"use client";

import React, { JSX, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { Upload, File, X, Check, AlertCircle } from "lucide-react";

export enum UploadFileStatus {
  UPLOADING = "uploading",
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}
// Types
export interface UploadedFile {
  file: File;
  id: string;
  uploadUrl?: string;
  progress: number;
  status: UploadFileStatus;
  abortController: AbortController;
  errorMessage?: string;
  isVanishing?: boolean;
}

export interface FileUploadProps {
  files: UploadedFile[];
  onFilesAdded: (files: UploadedFile[]) => void;
  onFileRemoved: (fileId: string) => void;
  onFileRejected?: (rejectedFiles: FileRejection[]) => void;
  maxSizeMB: number;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  title?: string;
  description?: string;
  hideFileList?: boolean;
}

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (): JSX.Element => {
  const iconClass = "w-8 h-8";
  return <File className={`${iconClass} text-gray-500`} />;
};

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesAdded,
  onFileRemoved,
  onFileRejected,
  maxSizeMB,
  maxFiles = 10,
  disabled = false,
  className = "",
  description = "Drag and drop your files here or click to browse",
  hideFileList = false,
}) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const newFiles: UploadedFile[] = [];

        for (const file of acceptedFiles) {
          newFiles.push({
            file,
            id: Math.random().toString(36).substr(2, 9),
            uploadUrl: "sds",
            progress: 0,
            errorMessage: undefined,
            status: UploadFileStatus.PENDING,
            abortController: new AbortController(),
          });
        }
        onFilesAdded(newFiles);
      }

      // Handle rejected files
      if (rejectedFiles.length > 0 && onFileRejected) {
        onFileRejected(rejectedFiles);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
      "application/octet-stream": [".stl"],
      "model/stl": [".stl"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "text/html": [".html", ".htm"],
    },
    maxSize: maxSizeBytes,
    maxFiles: maxFiles,
    disabled,
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone(dropzoneOptions);

  const handleRemoveFile = async (file: UploadedFile) => {
    if (file.status === "uploading") {
      file.abortController.abort();
    }

    onFileRemoved(file.id);
  };

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "uploading":
        return "text-primary-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (fileObj: UploadedFile) => {
    switch (fileObj.status) {
      case "success":
        return "Uploaded";
      case "error":
        return fileObj.errorMessage || "Failed";
      case "uploading":
        return `${Math.round(fileObj.progress)}%`;
      default:
        return "Pending";
    }
  };

  return (
    <div className={`${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2> */}
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: IMAGES(JPG, JPEG, ETC..), PDF, ZIP, STL, HTML •
            Max size: {maxSizeMB}MB per file
          </p>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out
            ${
              disabled
                ? "cursor-not-allowed opacity-50 border-gray-200 bg-gray-50"
                : "cursor-pointer"
            }
            ${
              !disabled && isDragActive && !isDragReject
                ? "border-primary-400 bg-primary-50"
                : !disabled && isDragReject
                ? "border-red-400 bg-red-50"
                : !disabled
                ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                : ""
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="space-y-4">
            <div
              className={`
              mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200
              ${
                !disabled && isDragActive && !isDragReject
                  ? "bg-primary-100"
                  : !disabled && isDragReject
                  ? "bg-red-100"
                  : "bg-gray-100"
              }
            `}
            >
              {!disabled && isDragReject ? (
                <AlertCircle className="w-8 h-8 text-red-500" />
              ) : (
                <Upload
                  className={`
                  w-8 h-8 transition-colors duration-200
                  ${
                    !disabled && isDragActive
                      ? "text-primary-500"
                      : "text-gray-500"
                  }
                `}
                />
              )}
            </div>

            <div>
              {disabled ? (
                <p className="text-gray-500 font-medium">Upload disabled</p>
              ) : isDragActive ? (
                isDragReject ? (
                  <p className="text-red-600 font-medium">
                    Some files are not supported
                  </p>
                ) : (
                  <p className="text-primary-600 font-medium">
                    Drop the files here...
                  </p>
                )
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    Drop your files here, or{" "}
                    <span className="text-primary-600">browse</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {maxFiles - files.length} of {maxFiles} files remaining
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File List */}
        {!hideFileList && files.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Selected Files {`(${files.length})`}
            </h3>

            <div className="space-y-2">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className={`flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200
                  transition-all duration-300 ease-in-out transform
                  ${
                    fileObj.isVanishing
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {/* File Icon */}
                  <div className="shrink-0">{getFileIcon()}</div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {fileObj.file.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {fileObj.status === "success" && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        {fileObj.status === "error" && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <button
                          onClick={() => handleRemoveFile(fileObj)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                          type="button"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatFileSize(fileObj.file.size)}
                      </p>

                      <span
                        className={`text-xs font-medium ${getStatusColor(
                          fileObj.status
                        )}`}
                      >
                        {getStatusText(fileObj)}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    {fileObj.status === "uploading" && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${fileObj.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Summary */}
        {/* {files.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {files.filter((f) => f.status === "success").length} of{" "}
                {files.length} files uploaded
              </div>

              {files.every((f) => f.status === "success") &&
                files.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      All files uploaded successfully
                    </span>
                  </div>
                )}

              {files.some((f) => f.status === "error") && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {files.filter((f) => f.status === "error").length} files
                    failed
                  </span>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FileUpload;
