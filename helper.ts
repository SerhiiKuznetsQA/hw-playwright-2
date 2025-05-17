import fs from 'fs';
import { title } from 'process';
import { faker } from '@faker-js/faker';

export function getAuthData(){
    const filePath = "login-data.json"
    const rawData = fs.readFileSync(filePath)
    const jsonData = JSON.parse(rawData.toString())

    return {
        userName:jsonData.userName  as string ,
        email:jsonData.email  as string,
        password:jsonData.password as string
    }
}


export function getArticleData(){
    const filePath = "article-data.json"
    const rawData = fs.readFileSync(filePath)
    const jsonData = JSON.parse(rawData.toString())

    return {
        title:jsonData.title  as string ,
        description:jsonData.description  as string,
        bodyArticle:jsonData.bodyArticle as string,
        tag:jsonData.tag as string,
    }
}


export function setUserData(){
    const filePath="login-data.json"
    const userObj  = {
    "userName" : faker.person.firstName().toLocaleLowerCase() as string,
    "email": faker.internet.email().toLocaleLowerCase() as string,
    "password" : faker.internet.password() as string
    }
    fs.writeFileSync(filePath, JSON.stringify(userObj, null, 2), 'utf-8');

    return userObj
}