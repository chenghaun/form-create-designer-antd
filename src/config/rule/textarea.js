/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-08 16:57:22
 * @Description: 
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '多行输入框';
const name = 'textarea';

export default {
    menu: 'main',
    icon: 'icon-textarea',
    label,
    name,
    event: ['blur', 'focus', 'change', 'input'],
    validate: ['string'],
    rule({t}) {
        return {
            type: 'input',
            field: uniqueId(),
            title: t('com.textarea.name'),
            info: '',
            $required: false,
            props: {
                type: 'textarea'
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'readonly'
            },
            {
                type: 'inputNumber',
                field: 'maxlength',
                props: {min: 0}
            },
            {
                type: 'input',
                field: 'placeholder'
            },
            {
                type: 'switch',
                field: 'allowClear',
                value: true
            },
            {
                type: 'switch',
                field: 'autosize'
            },
            {
                type: 'switch',
                field: 'showCount',
            },
            {
                type: 'switch',
                field: 'bordered',
                value: true
            },
        ]);
    }
};
