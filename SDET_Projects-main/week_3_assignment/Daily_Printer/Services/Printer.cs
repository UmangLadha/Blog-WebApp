using Daily_Printer.Exceptions;
using Daily_Printer.Interfaces;
using System;
using System.IO;
using System.Threading;

namespace Daily_Printer.Services
{
    public class Printer : IPrinter
    {
        private readonly IPrintResource _ink;

        private readonly IPrintResource _paper;

        private readonly FileHandler _fileHandler;

        private readonly ResourceValidator _resourceValidator;

        public Printer(IPrintResource ink, IPrintResource paper)
        {
            _ink = ink;
            _paper = paper;
            _fileHandler = new FileHandler(this);
            _resourceValidator = new ResourceValidator(ink, paper);
        }

        public int GetInkLevel()
        {
            return _ink.Level;
        }

        public int GetPaperCount()
        {
            return _paper.Level;
        }

        public void AddInk(int amount)
        {
            _ink.Add(amount);
        }

        public void AddPaper(int amount)
        {
            _paper.Add(amount);
        }

        public void PrintFile(string filePath)
        {
            _resourceValidator.ValidateResources();
            string fileContent = _fileHandler.ScanFile(filePath);
            string outputFile = _fileHandler.CreatePrintCopy(filePath, fileContent);
            _ink.Consume(10);
            _paper.Consume(1);
            Console.WriteLine($"Printing Completed. File saved at {outputFile}");
        }
    }
}