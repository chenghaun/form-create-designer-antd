/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-06 15:17:51
 * @Description: 
 * @contact_information: ext.chenghuan8@jd.com
 */
import { message as AntMessage } from 'ant-design-vue';
const message = (msg, type) => {
    try {
        return AntMessage[type](msg);
    } catch (error) {
        return AntMessage.info(msg)
    }
};

const errorMessage = (msg) => {
    return AntMessage.error(msg);

};

export default errorMessage;
export { message }