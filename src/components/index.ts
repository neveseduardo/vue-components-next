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
import ThemeToggle from './theme-toggle/ThemeToggle.vue';

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
	},
};
