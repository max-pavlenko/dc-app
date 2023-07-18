import getConfig from 'next/config'
import PUBLIC_RUNTIME_CONFIG from './publicRuntimeConfig.mjs'

export const ENV_VARS: typeof PUBLIC_RUNTIME_CONFIG = getConfig().publicRuntimeConfig;
