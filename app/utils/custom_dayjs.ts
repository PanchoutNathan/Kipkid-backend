import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
dayjs.locale(fr)
dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)

export default dayjs
