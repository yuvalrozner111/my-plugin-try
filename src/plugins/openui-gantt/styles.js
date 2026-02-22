import styled from 'styled-components';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';

export const StyledGanttChart = styled(GanttChart)`
    height: auto;
    width: 100%;

    /* Gantt Specific Variables */
    --smart-gantt-chart-task-color: ${({ theme }) => theme.palette.accent};
    --smart-gantt-chart-project-color: ${({ theme }) => theme.palette.extraColor};
    --smart-gantt-chart-timeline-task-row-color: ${({ theme }) => theme.bgColor2};
    --smart-gantt-chart-timeline-column-color: ${({ theme }) => theme.borderColor1};
    --smart-gantt-chart-task-label-color: ${({ theme }) => theme.textColor1};
    --smart-gantt-chart-project-label-color: ${({ theme }) => theme.titleColor};
    
    /* Ensure background is applied */
    background-color: ${({ theme }) => theme.bgColor2};
    color: ${({ theme }) => theme.textColor1};

    & .smart-timeline-view-cell {
        color: ${({ theme }) => theme.textColor2} !important;
    }

    & .smart-timeline-task-fill {
        border-radius: 6px !important;
    }
    
    /* Additional overrides for headers and grid if variables are not enough */
    & .smart-timeline-header-cell, & .smart-tree-header-cell {
        background-color: ${({ theme }) => theme.bgColor3} !important;
        color: ${({ theme }) => theme.titleColor} !important;
        border-color: ${({ theme }) => theme.borderColor} !important;
    }
    
    & .smart-timeline-cell, & .smart-tree-cell {
        border-color: ${({ theme }) => theme.borderColor} !important;
        background-color: ${({ theme }) => theme.bgColor2} !important;
        color: ${({ theme }) => theme.textColor1} !important;
    }
`;

export const Container = styled.div`
    /* Apply variables to container so other smart components like CheckBox inherit them */
    --smart-background: ${({ theme }) => theme.bgColor2};
    --smart-background-color: ${({ theme }) => theme.textColor1};
    --smart-surface: ${({ theme }) => theme.bgColor3};
    --smart-surface-color: ${({ theme }) => theme.textColor1};
    --smart-border: ${({ theme }) => theme.borderColor};
    --smart-border-color: ${({ theme }) => theme.borderColor};
    --smart-primary: ${({ theme }) => theme.palette.accent};
    --smart-primary-color: #ffffff;

    color: ${({ theme }) => theme.textColor1};

    & .demo-description {
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.textColor2};
    }

    & .options {
        margin-top: 1rem;
        padding: 1rem;
        background-color: ${({ theme }) => theme.bgColor2};
        border: 1px solid ${({ theme }) => theme.borderColor};
        border-radius: 6px;
    }

    & h3 {
        color: ${({ theme }) => theme.titleColor};
        margin-top: 0;
    }
`;
