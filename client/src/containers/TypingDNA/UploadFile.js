import "./TypingDNA.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Grid, Row, Text, Tree } from "@geist-ui/react";
import { Upload } from "@geist-ui/react-icons";

const UploadFile = ({ setFileBuffers }) => {
  const onDrop = useCallback(
    (acceptedFiles, _, e) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (ev) => {
          ev.preventDefault();
          setFileBuffers((p) => [...p, file]);
        };
        reader.readAsDataURL(file);
      });
    },
    [setFileBuffers]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    onDrop,
  });

  return (
    <div className="upload">
      <Grid.Container justify="flex-start">
        <Grid sm={24}>
          <Card hoverable shadow {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} hidden />
            <Upload size={20} />
            <Text h5>
              Drag 'n' drop single file here, or click to select files
            </Text>
          </Card>
        </Grid>
        <Grid sm={24}>
          <Text b p type="secondary">
            Uploaded documents
          </Text>
        </Grid>
        <Grid>
          <Tree initialExpand>
            <Tree.Folder name="my-documents">
              {acceptedFiles.map((file) => {
                return (
                  <Tree.File
                    key={file.name}
                    name={file.path}
                    extra={`${file.size} bytes`}
                  />
                );
              })}
            </Tree.Folder>
          </Tree>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default UploadFile;
