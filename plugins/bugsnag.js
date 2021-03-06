import Vue from 'vue'
import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'

if(process.env.NODE_ENV === 'production') {
  const bugsnagClient = bugsnag('c1e2241fdaa9785ed9f9288526498ae4')
  bugsnagClient.use(bugsnagVue, Vue)
}
