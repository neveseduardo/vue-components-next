import type { App } from 'vue';

import '../assets/css/app.css';
import Button from './button/Button.vue';
import Icon from './icon/Icon.vue';
import Badge from './badge/Badge.vue';
import Select from './select/Select.vue';
import Progress from './progress/Progress.vue';
import DatePicker from './datepicker/DatePicker.vue';
import Autocomplete from './autocomplete/Autocomplete.vue';
import Alert from './alert/Alert.vue';
import Avatar from './avatar/Avatar.vue';
import Checkbox from './checkbox/Checkbox.vue';
import Radio from './radio/Radio.vue';
import Switch from './switch/Switch.vue';
import Link from './link/Link.vue';
import Tag from './tag/Tag.vue';
import Accordion from './accordion/Accordion.vue';
import Tooltip from './tooltip/Tooltip.vue';
import Pagination from './pagination/Pagination.vue';
import Input from './input/Input.vue';
import ThemeToggle from './theme-toggler/ThemeToggle.vue';
import { Card, CardHeader, CardBody, CardFooter } from './card';
import { Dialog, DialogHeader, DialogBody, DialogFooter, DialogCloseTrigger } from './dialog';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerCloseTrigger } from './drawer';
import Dropdown from './dropdown/Dropdown.vue';
import InputWrapper from './inputwrapper/InputWrapper.vue';
import { Stepper, StepperItem } from './stepper';
import Table from './table/Table.vue';
import TableColumn from './table/TableColumn.vue';
import Tabs from './tabs/Tabs.vue';
import Tab from './tabs/Tab.vue';
import TabContent from './tabs/TabContent.vue';
import Toast from './toast/Toast.vue';

export {
	Button,
	Icon,
	Badge,
	Select,
	Progress,
	DatePicker,
	Autocomplete,
	Alert,
	Avatar,
	Checkbox,
	Radio,
	Switch,
	Link,
	Tag,
	Accordion,
	Tooltip,
	Pagination,
	Input,
	ThemeToggle,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	DialogCloseTrigger,
	Drawer,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	DrawerCloseTrigger,
	Dropdown,
	InputWrapper,
	Stepper,
	StepperItem,
	Table,
	TableColumn,
	Tabs,
	Tab,
	TabContent,
	Toast,
};

export default {
	install(app: App) {
		app.component('GButton', Button);
		app.component('GIcon', Icon);
		app.component('GBadge', Badge);
		app.component('GSelect', Select);
		app.component('GProgress', Progress);
		app.component('GDatePicker', DatePicker);
		app.component('GAutocomplete', Autocomplete);
		app.component('GAlert', Alert);
		app.component('GAvatar', Avatar);
		app.component('GCheckbox', Checkbox);
		app.component('GRadio', Radio);
		app.component('GSwitch', Switch);
		app.component('GLink', Link);
		app.component('GTag', Tag);
		app.component('GAccordion', Accordion);
		app.component('GTooltip', Tooltip);
		app.component('GPagination', Pagination);
		app.component('GInput', Input);
		app.component('GThemeToggle', ThemeToggle);
		app.component('Card', Card);
		app.component('CardHeader', CardHeader);
		app.component('CardBody', CardBody);
		app.component('CardFooter', CardFooter);
		app.component('GDialog', Dialog);
		app.component('GDialogHeader', DialogHeader);
		app.component('GDialogBody', DialogBody);
		app.component('GDialogFooter', DialogFooter);
		app.component('GDialogCloseTrigger', DialogCloseTrigger);
		app.component('GDrawer', Drawer);
		app.component('GDrawerHeader', DrawerHeader);
		app.component('GDrawerBody', DrawerBody);
		app.component('GDrawerFooter', DrawerFooter);
		app.component('GDrawerCloseTrigger', DrawerCloseTrigger);
		app.component('GDropdown', Dropdown);
		app.component('GInputWrapper', InputWrapper);
		app.component('GStepper', Stepper);
		app.component('GStepperItem', StepperItem);
		app.component('GTable', Table);
		app.component('GTableColumn', TableColumn);
		app.component('GTabs', Tabs);
		app.component('GTab', Tab);
		app.component('GTabContent', TabContent);
		app.component('GToast', Toast);
	},
};
