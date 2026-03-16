package com.vitalhealthreactnative

import android.content.Context
import android.content.Intent
import io.tryvital.vitalhealthcore.model.ProviderAvailability
import io.tryvital.vitalhealthcore.model.WritableVitalResource

fun raiseUnimplemented(): Nothing {
  throw IllegalArgumentException("the requested provider is unavailable on this device")
}

@Suppress("unused")
internal object UnavailableVitalHealthProviderDefinition : VitalHealthProviderDefinition {

  override val provider: AndroidProvider
    get() { raiseUnimplemented() }
  override val displayName: String
    get() { raiseUnimplemented() }
  override val supportedWriteResources: Set<WritableVitalResource>
    get() { raiseUnimplemented() }
  override val syncStatusEvent: VitalHealthEvent
    get() { raiseUnimplemented() }
  override val connectionStatusEvent: VitalHealthEvent
    get() { raiseUnimplemented() }

  override fun isAvailable(context: Context): ProviderAvailability {
    raiseUnimplemented()
  }

  override fun openPlatformHealthAppIntent(context: Context): Intent? {
    raiseUnimplemented()
  }

  override fun getOrCreateManager(context: Context): VitalHealthManagerBridge {
    raiseUnimplemented()
  }
}
