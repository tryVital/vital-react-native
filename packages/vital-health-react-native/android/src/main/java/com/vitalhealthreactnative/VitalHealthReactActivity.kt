package com.vitalhealthreactnative

import android.annotation.SuppressLint
import com.facebook.react.ReactActivity

/**
 * [VitalHealthReactActivity] is a workaround to React Native Android not properly overriding
 * [ComponentActivity.onRequestPermissionsResult], breaking AndroidX activity result contracts.
 */
open class VitalHealthReactActivity: ReactActivity() {
  @SuppressLint("VisibleForTests")
  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
  ) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)

    VitalHealthReactNativeModule.onRequestPermissionsResult(
      this.reactInstanceManager,
      requestCode,
      permissions,
      grantResults
    )
  }
}
