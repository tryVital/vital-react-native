package com.vitalcorereactnative

import com.squareup.moshi.JsonClass
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory

sealed class ReactNativeAuthenticateRequest {
  @JsonClass(generateAdapter = true)
  data class SignInToken(val type: String, val rawToken: String): ReactNativeAuthenticateRequest()

  @JsonClass(generateAdapter = true)
  data class APIKey(val type: String, val key: String, val userId: String, val region: String, val environment: String): ReactNativeAuthenticateRequest()

  companion object {
    val jsonAdapter = PolymorphicJsonAdapterFactory.of(ReactNativeAuthenticateRequest::class.java, "type")
      .withSubtype(SignInToken::class.java, "signInToken")
      .withSubtype(APIKey::class.java, "apiKey")
  }
}

