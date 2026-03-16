using System.Resources;
using Daily_Printer.Exceptions;
using Daily_Printer.Interfaces;

namespace Daily_Printer.Services
{
    class ResourceValidator
    {
        private readonly IPrintResource _ink;

        private readonly IPrintResource _paper;

        public ResourceValidator(IPrintResource ink, IPrintResource paper)
        {
            _ink = ink;
            _paper = paper;
        }

        public void ValidateResources()
        {
            if (_ink.Level <= 0)
            {
                throw new PrintingException("Not enough ink to print. Please add Ink");
            }
            if (_paper.Level <= 0)
            {
                throw new PrintingException("Not enough paper to print. Please add Paper");
            }
        }
    }

}