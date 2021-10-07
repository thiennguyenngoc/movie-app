import React from 'react'
import { Tabs } from "antd";
import ShowMovieList from './ManageMovieList';
import ShowUserList from './ManageUserList';
import './assets/AdminMainPage.scss'
import adminBg from 'assets/images/admin-bg.jpg'

const { TabPane } = Tabs;

export default function AdminMainPage() {
    return (
        <div className='adminFormWrapper'>
            <Tabs tabPosition="left">
                <TabPane tab="Quản lý phim" key="1">
                    <ShowMovieList />
                </TabPane>
                <TabPane tab="Quản lý người dùng" key="2">
                    <ShowUserList />
                </TabPane>
            </Tabs>
        </div>
    )
}
