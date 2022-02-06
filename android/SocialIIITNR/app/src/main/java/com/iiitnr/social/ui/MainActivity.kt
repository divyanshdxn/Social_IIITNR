package com.iiitnr.social.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.iiitnr.social.R
import com.iiitnr.social.data.auth.SignInResponse
import com.iiitnr.social.databinding.ActivityMainBinding
import com.iiitnr.social.common.Constants
import com.iiitnr.social.common.shortToast
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private var _signInResponse: SignInResponse? = null
    val signInResponse: SignInResponse get() = _signInResponse!!

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        _signInResponse = intent.extras?.getParcelable(Constants.SIGN_IN_RESPONSE)!!
        shortToast("Welcome ${signInResponse.profile.firstName}!")

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController
        binding.bottomNav.setupWithNavController(navController)


    }
}