using Daily_Printer.Interfaces;
using System;
using System.IO;
using System.Threading;

namespace Daily_Printer.Services
{
    public class FileHandler
    {
        private readonly IPrinter _printer;

        public FileHandler(IPrinter printer)
        {
            _printer = printer;
        }

        public void HandlePrint()
        {
            string filePath;
            Console.Write("Enter the file path to print: ");
            filePath = Console.ReadLine();
            if (!File.Exists(filePath))
            {
                Console.WriteLine($"File not found at '{filePath}'");
                return; 
            }

            _printer.PrintFile(filePath);
        }

        public string ScanFile(string filePath)
        {
            Console.WriteLine("Scanning File...");
            string fileContent = File.ReadAllText(filePath);
            Thread.Sleep(1000);
            return fileContent;
        }

        public string CreatePrintCopy(string filePath, string fileContent)
        {
            Console.WriteLine("Printing File...");
            string fileDirectory = Path.GetDirectoryName(filePath);
            string fileName = Path.GetFileNameWithoutExtension(filePath);
            string fileExe = Path.GetExtension(filePath);
            string outputFile = Path.Combine(fileDirectory, $"{fileName}_output{fileExe}");
            File.WriteAllText(outputFile, fileContent);
            return outputFile;
        }
    }
}