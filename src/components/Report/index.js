import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  ReportSection,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from './ReportStyles';

export default function Report() {
  const reports = useSelector(state => state.report);
  const quotes = useSelector(state => state.quotes)
  const users = useSelector(state => state.users)
  const quoteReports = reports.filter(report => report.type === 'quote');
  const userReports = reports.filter(report => report.type === 'user');

  const formatDateTime = (dateTime) => {
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const findUser = (userId) => {
    return users.find(user => user.id === userId).userName
  }

  const findQuote = (quoteId) => {
    return quotes.find(quote => quote.id === quoteId).author
  }

  return (
    <Container>
      {reports.length > 0 ? (
        <>
          {quoteReports.length > 0 && (
            <ReportSection>
              <h4>Quote Reports</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Reporter ID</TableHeader>
                    <TableHeader>Reported Quote</TableHeader>
                    <TableHeader>Description</TableHeader>
                    <TableHeader>Created Date</TableHeader>
                    <TableHeader>Created Time</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quoteReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{findUser(report.reporterId)}</TableCell>
                      <TableCell>{findQuote(report.reportedId)}</TableCell>
                      <TableCell>{report.text}</TableCell>
                      <TableCell>{formatDateTime(report.createdDate)}</TableCell>
                      <TableCell>{report.createdTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ReportSection>
          )}
          {userReports.length > 0 && (
            <ReportSection>
              <h4>User Reports</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Reporter ID</TableHeader>
                    <TableHeader>Reported ID</TableHeader>
                    <TableHeader>Text</TableHeader>
                    <TableHeader>Created Date</TableHeader>
                    <TableHeader>Created Time</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{findUser(report.reporterId)}</TableCell>
                      <TableCell>{findUser(report.reportedId)}</TableCell>
                      <TableCell>{report.text}</TableCell>
                      <TableCell>{report.createdDate}</TableCell>
                      <TableCell>{report.createdTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ReportSection>
          )}
        </>
      ) : (
        <p>No Reports Found</p>
      )}
    </Container>
  );
}
