package com.iiitnr.social.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.iiitnr.social.data.auth.AuthApi
import com.iiitnr.social.databinding.ActivitySigninBinding
import com.iiitnr.social.util.Constants
import com.iiitnr.social.util.getBearerHeader
import com.iiitnr.social.util.shortToast
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch
import javax.inject.Inject


@AndroidEntryPoint
class SignInActivity : AppCompatActivity() {

    @Inject
    lateinit var authApi: AuthApi

    private lateinit var mGoogleSignInClient: GoogleSignInClient
    private lateinit var binding: ActivitySigninBinding
    private lateinit var signInIntentLauncher: ActivityResultLauncher<Intent>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySigninBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        mGoogleSignInClient = GoogleSignIn.getClient(
            this, GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken("557790709288-4la84pac5ktcasmjtdfa40312pgk5nnj.apps.googleusercontent.com")
                .requestEmail()
                .build()
        )

        signInIntentLauncher =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
                Log.d(TAG, "onCreate: ${it.resultCode}")
                if (it.resultCode == Activity.RESULT_OK) {
                    try {
                        val task = GoogleSignIn.getSignedInAccountFromIntent(it.data)
                        val account: GoogleSignInAccount = task.getResult(ApiException::class.java)
                        handleLogin(account)
                    } catch (e: Exception) {
                        shortToast("Authentication failed")
                    }
                }
            }

        binding.btnSignIn.setOnClickListener {
            showLoading()
            binding.loginProgressMessage.text = "Logging you in..."
            signInIntentLauncher.launch(mGoogleSignInClient.signInIntent)
        }
    }

    override fun onStart() {
        super.onStart()
        val account = GoogleSignIn.getLastSignedInAccount(this)
        if (account != null) {
            handleLogin(account)
        } else {
            hideLoading()
        }
    }

    private fun showLoading() {
        binding.btnSignIn.visibility = View.GONE
        binding.loginProgress.visibility = View.VISIBLE
    }

    private fun hideLoading() {
        binding.loginProgress.visibility = View.GONE
        binding.btnSignIn.visibility = View.VISIBLE
    }

    private fun handleLogin(account: GoogleSignInAccount) {
        val idToken = account.idToken
        lifecycleScope.launch {
            val signInResponse = authApi.signIn(getBearerHeader(idToken!!))
            val intent = Intent(this@SignInActivity, MainActivity::class.java).apply {
                putExtra(Constants.SIGN_IN_RESPONSE, signInResponse)
            }
            startActivity(intent)
            finish()
        }
    }

    companion object {
        const val TAG = "SIGN_IN"
    }

}