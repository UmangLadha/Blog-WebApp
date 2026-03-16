using System;

namespace Second_Assignment
{
    public class SmartArray
    {
        private int[] values;
        private int[] time;
        private int globalTime;
        private int setAllTime;
        private int setAllValue;
        public SmartArray(int arraySize)
        {
            values = new int[arraySize];
            time = new int[arraySize];

            globalTime = 0;
            setAllTime = -1;
            setAllValue = 0;
        }
        public void Set(int index, int value)
        {
            globalTime++;
            values[index] = value;
            time[index] = globalTime;
        }
        public int Get(int index)
        {
            if (time[index] > setAllTime)
            {
                return values[index];
            }
            else
            {
                return setAllValue;
            }
        }
        public void SetAll(int value)
        {
            globalTime++;
            setAllValue = value;
            setAllTime = globalTime;
        }
    }

}