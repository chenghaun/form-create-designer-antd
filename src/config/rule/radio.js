/*
 * @Author: ext.chenghuan8
 * @Date: 2025-01-03 14:22:41
 * @LastEditors: ext.chenghuan8
 * @LastEditTime: 2025-01-08 17:39:40
 * @Description: 
 * @contact_information: ext.chenghuan8@jd.com
 */
import uniqueId from '@form-create/utils/lib/unique';
import { localeProps, makeOptionsRule, makeTreeOptions } from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    menu: 'main',
    icon: 'icon-radio',
    label,
    name,
    event: ['change'],
    validate: ['string', 'number'],
    rule({ t }) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.radio.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: makeTreeOptions(t('props.option'), { label: 'label', value: 'value' }, 1)
        };
    },
    props(_, { t }) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            { type: 'switch', field: 'disabled' },
            {
                type: 'switch',
                field: 'optionType',
                value: 'default',
                props: {
                    unCheckedValue: 'default',
                    checkedValue: 'button'
                }
            }]);
    }
};
