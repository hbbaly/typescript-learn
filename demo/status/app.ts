import axios from "../../src";
import { AxiosError } from "../../src/helpers/error";
// 走了catch
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message, 'hbbaly')
})
// 没有走catch
axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})