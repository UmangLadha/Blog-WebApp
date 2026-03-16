using System;

namespace Daily_Printer.Exceptions
{
    public class PrintingException : Exception
    {
        public PrintingException(string message) : base(message)
        {
        }
    }
}
