<?php
/**
 * Google Calendar Events
 *
 * @package         GCE
 * @author          Phil Derksen <pderksen@gmail.com>, Nick Young <mycorpweb@gmail.com>
 * @license         GPL-2.0+
 * @link            http://philderksen.com
 * @copyright       2014-2015 Phil Derksen
 *
 * @wordpress-plugin
 * Plugin Name: Google Calendar Events
 * Plugin URI:  https://wordpress.org/plugins/google-calendar-events/
 * Description: Show off your Google calendar in grid (month) or list view, in a post, page or widget, and in a style that matches your site.
 * Version:     2.2.6
 * Author:      Phil Derksen
 * Author URI:  http://philderksen.com
 * License:     GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: gce
 * Domain Path: /languages/google-calendar-events/languages
 */

/**
 * Copyright (c) 2014-2015 Phil Derksen <pderksen@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */


require_once 'google-calendar-events/google-calendar-events.php';

/**

// Useful global constants
define( 'GCE_VERSION', '2.2.6' );
define( 'GCE_URL',     plugin_dir_url( __FILE__ ) );
define( 'GCE_PATH',    dirname( __FILE__ ) . '/' );
define( 'GCE_INC',     GCE_PATH . 'includes/' );

// Include files
require_once GCE_INC . 'functions/core.php';


// Activation/Deactivation
register_activation_hook( __FILE__, '\TenUp\Google_Calendar_Events\Core\activate' );
register_deactivation_hook( __FILE__, '\TenUp\Google_Calendar_Events\Core\deactivate' );

// Bootstrap
TenUp\Google_Calendar_Events\Core\setup();

**/
