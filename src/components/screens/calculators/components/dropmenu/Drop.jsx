import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Drop = () => {
    const [isUsersOpen, setIsUsersOpen] = useState(false);
    const [isPostsOpen, setIsPostsOpen] = useState(false);

    const toggleUsers = () => {
        setIsUsersOpen(!isUsersOpen);
        if (isPostsOpen) {
            setIsPostsOpen(false);
        }
    };

    const togglePosts = () => {
        setIsPostsOpen(!isPostsOpen);
        if (isUsersOpen) {
            setIsUsersOpen(false);
        }
    };

    return (
        <div className="relative">
            <ul className="list-none p-0">
                <li className="flex flex-col">
                    <a className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-neutral-100 cursor-pointer" onClick={toggleUsers}>
                        <span className="font-medium">МИ П.16-2021</span>
                        {isUsersOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
                    </a>
                    <ul className={`pl-7 mt-2 ${isUsersOpen ? 'block' : 'hidden'}`}>
                        <li>
                            <Link to={"/calculator/CalcPageK1"} className="block px-4 py-2 text-base text-gray-700 hover:bg-neutral-100">К1 Прямое измерение, абсолютная погрешность</Link>
                        </li>
                        <li>
                            <Link to={"/calculator/CalcPageK2"} className="block px-4 py-2 text-base text-gray-700 hover:bg-neutral-100">К2 Прямое измерение, относительная погрешность</Link>
                        </li>
                    </ul>
                </li>
                <li className="flex flex-col">
                    <a className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-neutral-100 cursor-pointer" onClick={togglePosts}>
                        <span className="font-medium">МИ П.16-2021</span>
                        {isPostsOpen ? <FaChevronDown className="ml-auto" /> : <FaChevronRight className="ml-auto" />}
                    </a>
                    <ul className={`pl-7 mt-2 ${isPostsOpen ? 'block' : 'hidden'}`}>
                        <li>
                            <Link to="#all-posts" className="block px-4 py-2 text-base text-gray-700 hover:bg-neutral-100">All</Link>
                        </li>
                        <li>
                            <Link to="#categories" className="block px-4 py-2 text-base text-gray-700 hover:bg-neutral-100">Categories</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Drop;
