import styled from 'styled-components';

export const Container = styled.div`
  color: #fff;
`;

export const ReportSection = styled.div`
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const TableHead = styled.thead`
  background-color: #333;
`;

export const TableBody = styled.tbody`
  background-color: #444;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #555;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 10px;
`;
