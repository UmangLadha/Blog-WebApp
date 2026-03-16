namespace Daily_Printer.Interfaces
{
    public interface IPrinter
    {
        void PrintFile(string filePath);
        void AddInk(int amount);
        void AddPaper(int amount);
        int GetInkLevel();
        int GetPaperCount();
    }
}
