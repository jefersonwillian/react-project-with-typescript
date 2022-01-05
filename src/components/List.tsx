// @flow
import axios, { Axios } from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
type Props = {};

interface IUser {
    email: string,
    gender: string,
    id: number,
    name: string,
    status: string,
}

interface IPosts {
    body: string,
    id: number,
    title: string,
    user_id: number
}

// fsc function stateless component
export const List = (props: Props) => {

    const [user, setUser] = useState<IUser[]>([]);

    const [posts, setPosts] = useState<IPosts[]>([]);

    useEffect(() => {
        (async () => {
            await getData();
            await getPosts();
        })();

    }, []);


    const getData = async () => {
        axios.get('https://gorest.co.in/public/v1/users').then(response => {
            setUser(response.data.data)
        }).catch(error => {
            console.log("error", error)
        })
    }

    const getPosts = async () => {
        axios.get('https://gorest.co.in/public/v1/posts').then(response => {
            setPosts(response.data.data)
        }).catch(error => {
            console.log("error", error)
        })
    }


    return (
        <div>
            <div>
                <h1>User List</h1>
                <ul>
                    {user.map((user: IUser) => (
                        <li>{user.id} - {user.name} - {user.gender} - {user.email}</li>
                    ))}
                </ul>
            </div>
            <br />
            <div>
                <h1>Posts List</h1>
                <ul>
                    {posts.map((post: IPosts) => (
                        <><h2>{post.title}</h2><p>{post.body}</p></>
                    ))}
                </ul>
            </div>
        </div>

    );
};
