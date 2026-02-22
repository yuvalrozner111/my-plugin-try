import 'smart-webcomponents-react/source/styles/smart.default.css';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

import { StyledGanttChart, Container } from './styles';
import { dataSource } from './data/mockData';

export default function Gantti() {
    const ganttChart = useRef();
    const { i18n } = useTranslation('openui-gantt');

    useEffect(() => {
        if (!ganttChart.current) return
        const messages = Object.assign({}, ganttChart.current.messages);
        const heResources = i18n.getResourceBundle('he', 'openui-gantt');
        if (heResources) {
            messages['he'] = heResources;
        }
        ganttChart.current.messages = messages;
    }, [i18n])

    const isRTL = i18n.language === 'he';

    const handleEvent = (event) => {
        if (event.type === 'dragEnd') {
            const { item, dateStart, dateEnd } = event.detail;
            console.log(`Task '${item.label}' dragged. New Start: ${dateStart}, New End: ${dateEnd}`);
        }
        console.log(event.type, event.detail);
    };

    const taskColumns = [
        {
            label: 'tree Label',
            value: 'treeLabel'
        },
        {
            label: 'Job Name',
            value: 'job'
        }];

    return (
        <Container>
            <div className="demo-description">
                Gantt Chart direction and locale are now controlled by the application language.
            </div>
            <StyledGanttChart
                ref={ganttChart}
                rightToLeft={isRTL}
                view="month"
                taskColumns={taskColumns}
                locale={i18n.language}
                dataSource={dataSource}
                onChange={handleEvent}
                onOpening={handleEvent}
                onClosing={handleEvent}
                onOpen={handleEvent}
                onClose={handleEvent}
                onDragStart={handleEvent}
                onDragEnd={handleEvent}
                onResizeStart={handleEvent}
                onResizeEnd={handleEvent}
                onProgressChangeStart={handleEvent}
                onProgressChangeEnd={handleEvent}
                onConnectionStart={handleEvent}
                onConnectionEnd={handleEvent}
                onItemRemove={handleEvent}
                onItemInsert={handleEvent}
                onItemUpdate={handleEvent}
                onItemClick={handleEvent}
            ></StyledGanttChart>
        </Container>
    )
}