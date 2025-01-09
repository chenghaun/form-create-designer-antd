/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-09 10:14:19
 * @Description: 
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from '@form-create/utils/lib/unique';
import { localeProps } from '../../utils';

const label = '滑块';
const name = 'slider';

export default {
    menu: 'main',
    icon: 'icon-slider',
    label,
    name,
    event: ['change', 'input'],
    validate: ['number', 'array'],
    rule({ t }) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.slider.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, { t }) {
        return localeProps(t, name + '.props', [{ type: 'switch', field: 'disabled' }, {
            type: 'switch',
            field: 'range'
        }, {
            type: 'inputNumber',
            field: 'min',
            props: { min: 0 }
        }, {
            type: 'inputNumber',
            field: 'max',
            props: { min: 0 },
        }, {
            type: 'inputNumber',
            field: 'step',
            props: { min: 0 },
        }, {
            type: 'switch',
            field: 'dots'
        },
        {
            type: 'switch',
            field: 'vertical'
        },]);
    }
};
