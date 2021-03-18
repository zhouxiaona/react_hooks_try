import React from 'react';
import { History, Location } from "history"
import { match } from "react-router-dom"
import { type } from 'os';

// 参数类型审查
export interface Props extends React.Props<any> {
  match: match;
  history: History;
  Location: Location;
  home: any;
  homeActions: any
}

