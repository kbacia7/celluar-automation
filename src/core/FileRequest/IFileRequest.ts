export interface IFileRequest {
   loadFileAsync(filePath: string): Promise<{}>,
   loadFileSync(filePath: string): string
}
