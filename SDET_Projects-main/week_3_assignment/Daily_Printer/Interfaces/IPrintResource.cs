namespace Daily_Printer.Interfaces
{
    public interface IPrintResource
    {
        int Level { get; }
        void Add(int amount);
        void Consume(int amount);
    }
}
