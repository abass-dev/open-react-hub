import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DAYS_IN_WEEK, MONTHS, getDaysInMonth, getFirstDayOfMonth, isSameDay, formatDate } from '@/utils/dateUtils';

interface CalendarProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    onDateSelect,
    minDate,
    maxDate,
}) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

    const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
    const firstDayOfMonth = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

    const goToPreviousMonth = useCallback(() => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }, [currentMonth, currentYear]);

    const goToNextMonth = useCallback(() => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }, [currentMonth, currentYear]);

    const isDateDisabled = useCallback((date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    }, [minDate, maxDate]);

    const renderDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            const isDisabled = isDateDisabled(date);

            days.push(
                <button
                    key={day}
                    onClick={() => !isDisabled && onDateSelect(date)}
                    disabled={isDisabled}
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${isSelected
                            ? 'bg-primary text-primary-foreground'
                            : isToday
                                ? 'bg-secondary text-secondary-foreground'
                                : 'hover:bg-accent'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-label={formatDate(date)}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="p-4 bg-background border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-full hover:bg-accent"
                    aria-label="Previous month"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold">
                    {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-full hover:bg-accent"
                    aria-label="Next month"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;

