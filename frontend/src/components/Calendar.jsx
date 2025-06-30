import React, { useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskContext from '../context/TaskContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const StudyCalendar = ({ studyGroupId }) => {
    const taskContext = useContext(TaskContext);
    const { tasks, getTasks, addTask, updateTask, deleteTask } = taskContext;

    useEffect(() => {
        if (studyGroupId) {
            getTasks(studyGroupId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studyGroupId]);

    const handleSelectSlot = ({ start }) => {
        const title = window.prompt('New Task Title');
        if (title) {
            addTask({ title, dueDate: start, studyGroup: studyGroupId, status: 'To Do' });
        }
    };

    const handleSelectEvent = (event) => {
        if (window.confirm(`Are you sure you want to delete the task '${event.title}'?`)) {
            deleteTask(event._id);
        }
    };

    const handleEventDrop = ({ event, start }) => {
        updateTask(event._id, { ...event, dueDate: start });
    };

    const events = tasks.map(task => ({
        ...task,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate), // Tasks are single-day events
        title: `${task.title} [${task.status}]`
    }));

    return (
        <DndProvider backend={HTML5Backend}>
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                onEventDrop={handleEventDrop}
            />
        </DndProvider>
    );
};

export default StudyCalendar; 