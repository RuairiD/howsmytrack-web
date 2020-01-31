import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

import FeedbackGroupPage from './components/FeedbackGroupPage/FeedbackGroupPage';
import FeedbackGroupsPage from './components/FeedbackGroupsPage/FeedbackGroupsPage';
import FaqPage from './components/FaqPage/FaqPage';


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={FaqPage}/>
                    <Route path="/groups" component={FeedbackGroupsPage}/>
                    <Route path="/group" component={FeedbackGroupPage}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;
