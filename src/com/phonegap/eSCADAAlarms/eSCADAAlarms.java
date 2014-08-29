package com.phonegap.eSCADAAlarms;

import android.os.Bundle;
import org.apache.cordova.*;

public class eSCADAAlarms extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        super.loadUrl("file:///android_asset/www/index.html");
    }
}

