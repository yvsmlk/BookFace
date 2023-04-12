import React from 'react'
import * as FaIcons from 'react-icons/fa' 

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Profile',
        path: '/Profile',
        icon: <FaIcons.FaUser />
    },
   
    {
        title: 'Notifications',
        path: '/Notifications',
        icon: <FaIcons.FaBell/>
    },
    {
        title: 'BookMark',
        path: '/BookMark',
        icon: <FaIcons.FaBookmark/>
    },
    {
        title: 'More',
        path: '/More',
        icon: <FaIcons.FaEllipsisV/>
    }
]
