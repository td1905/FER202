// src/pages/DemoPage.jsx – tổng hợp tất cả component demo trong Accordion
import React from 'react';
import { Accordion, Badge } from 'react-bootstrap';
import AxiosDemo from '../components/AxiosDemo';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';
import PatchPost from '../components/PatchPost';
import DeletePost from '../components/DeletePost';
import RequestConfig from '../components/RequestConfig';
import PostDetail from '../components/PostDetail';
import AxiosDemoAsync from '../components/AxiosDemoAsync';

const sections = [
  {
    key: '0',
    title: 'Phần 1 + NC4 – AxiosDemo (GET + AbortController + postId)',
    badges: ['NC1', 'NC4'],
    Component: AxiosDemo,
  },
  {
    key: '1',
    title: 'Bài 2.1 + NC9 + NC10 – PostList (GET params + debounce + bulk delete)',
    badges: ['NC1', 'NC2', 'NC9', 'NC10'],
    Component: PostList,
  },
  {
    key: '2',
    title: 'Bài 2.2 + NC5 – CreatePost (POST + form validation)',
    badges: ['NC1', 'NC5'],
    Component: CreatePost,
  },
  {
    key: '3',
    title: 'Bài 2.3 + NC5 – UpdatePost (PUT + validation)',
    badges: ['NC1', 'NC5'],
    Component: UpdatePost,
  },
  {
    key: '4',
    title: 'Bài 2.4 + NC5 – PatchPost (PATCH + InputGroup)',
    badges: ['NC1', 'NC5'],
    Component: PatchPost,
  },
  {
    key: '5',
    title: 'Bài 2.5 + NC5 + NC10 – DeletePost (Modal + Toast + Optimistic)',
    badges: ['NC1', 'NC5', 'NC10'],
    Component: DeletePost,
  },
  {
    key: '6',
    title: 'Bài 2.6 + NC2 – RequestConfig (axios(config) + headers)',
    badges: ['NC1', 'NC2'],
    Component: RequestConfig,
  },
  {
    key: '7',
    title: 'NC3 – PostDetail (Promise.allSettled + Benchmark Tuần tự vs Song song)',
    badges: ['NC3'],
    Component: PostDetail,
  },
  {
    key: '8',
    title: 'NC8 – Custom hook useAxios (data, loading, error, refetch, AbortController)',
    badges: ['NC8'],
    Component: AxiosDemoAsync,
  },
];

const DemoPage = () => (
  <>
    <h2 className="mb-4">
      Demo tất cả tính năng Axios{' '}
      <Badge bg="primary" style={{ fontSize: '0.55em' }}>NC1–NC10</Badge>
    </h2>
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      {sections.map(({ key, title, badges, Component }) => (
        <Accordion.Item eventKey={key} key={key}>
          <Accordion.Header>
            <span className="me-2">{title}</span>
            {badges.map(b => (
              <Badge key={b} bg="info" className="me-1" style={{ fontSize: '0.7em' }}>{b}</Badge>
            ))}
          </Accordion.Header>
          <Accordion.Body>
            <Component />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </>
);

export default DemoPage;
