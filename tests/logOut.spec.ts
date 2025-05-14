import test from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test.use({storageState:'./.auth/user.json'})


// Нужно быть внимательным при лог ауте : 
// 1.Удалить файл сессии после лог аута 
// 2.Протухання ссесии 
// Незабывай удалять файлы куки в проекте 