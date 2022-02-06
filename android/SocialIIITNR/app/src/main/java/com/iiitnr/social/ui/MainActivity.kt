package com.iiitnr.social.ui

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.iiitnr.social.R
import com.iiitnr.social.common.Constants
import com.iiitnr.social.common.getGoogleSignInClient
import com.iiitnr.social.data.auth.SignInResponse
import com.iiitnr.social.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private var _signInResponse: SignInResponse? = null
    val signInResponse: SignInResponse get() = _signInResponse!!

    private var _mGoogleSignInClient: GoogleSignInClient? = null
    val mGoogleSignInClient: GoogleSignInClient get() = _mGoogleSignInClient!!

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        _signInResponse = intent.extras?.getParcelable(Constants.SIGN_IN_RESPONSE)!!

        _mGoogleSignInClient = getGoogleSignInClient(this)

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController
        binding.bottomNav.setupWithNavController(navController)


    }

    fun hideNavBar() {
        binding.bottomNav.visibility = View.GONE
    }

    fun showNavBar() {
        binding.bottomNav.visibility = View.VISIBLE
    }
}