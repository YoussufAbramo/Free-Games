<?php
/**
 * Admin Panel - Integrated with CRM Dashboard UI
 */

// CREDENTIALS - Kept from original admin.php
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'admin123');

session_start();

// Handle login
if (isset($_POST['username']) && isset($_POST['password'])) {
    if ($_POST['username'] === ADMIN_USERNAME && $_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = ADMIN_USERNAME;
        // Redirect to avoid form resubmission
        header('Location: index.php');
        exit();
    } else {
        $error = 'Invalid username or password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit();
}

// Check if logged in
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'];

// Load user data if logged in
$userData = [];
$dataFile = __DIR__ . '/../user_data.json';
$todayCount = 0;

if ($isLoggedIn && file_exists($dataFile)) {
    $fileContents = file_get_contents($dataFile);
    $userData = json_decode($fileContents, true) ?? [];

    // Calculate stats
    $today = date('Y-m-d');
    $todayCount = count(array_filter($userData, function ($user) use ($today) {
        return isset($user['timestamp']) && strpos($user['timestamp'], $today) === 0;
    }));
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <!-- Chart.js for charts -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body class="<?php echo !$isLoggedIn ? 'login-body' : ''; ?>">

    <?php if (!$isLoggedIn): ?>
        <!-- LOGIN VIEW -->
        <div class="login-card">
            <h2>🚀 Admin Portal</h2>
            <p>Welcome back</p>

            <?php if (isset($error)): ?>
                <div class="error">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST">
                <input type="text" name="username" placeholder="Username" required autofocus>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
        </div>

    <?php else: ?>
        <!-- DASHBOARD VIEW -->
        <div class="sidebar">
            <h2>Free Games Admin</h2>
            <a href="#" class="active">Dashboard</a>
            <!-- <a href="#">Subscribers</a> -->
            <a href="?logout=1">Logout</a>
        </div>

        <div class="main">
            <div class="topbar">
                <h1>Dashboard</h1>
                <div>
                    <button class="toggle-btn" onclick="toggleTheme()">🌙</button>
                    <span class="user">Admin</span>
                </div>
            </div>

            <!-- KPIs -->
            <div class="kpi">
                <div class="kpi-card blue">
                    <h3>Total Subscribers</h3>
                    <p>
                        <?php echo count($userData); ?>
                    </p>
                    <span>All time</span>
                </div>

                <div class="kpi-card green">
                    <h3>Today's Signups</h3>
                    <p>
                        <?php echo $todayCount; ?>
                    </p>
                    <span>
                        <?php echo date('M d, Y'); ?>
                    </span>
                </div>

                <!-- 
            <div class="kpi-card purple">
                <h3>Revenue</h3>
                <p>$0</p>
                <span>+0%</span>
            </div>
            -->
            </div>

            <!-- CHARTS (Optional - Placeholder for now) -->
            <div class="charts">
                <div class="chart-card">
                    <h3>Growth</h3>
                    <canvas id="growthChart"></canvas>
                </div>
            </div>

            <!-- TABLE -->
            <div class="table-card">
                <div class="table-header">
                    <h3>Recent Subscribers</h3>
                    <!-- <button onclick="openModal()">+ Add Manual</button> -->
                </div>

                <?php if (empty($userData)): ?>
                    <div style="text-align:center; padding: 20px; color: #666;">
                        No data collected yet.
                    </div>
                <?php else: ?>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach (array_reverse($userData) as $index => $user): ?>
                                <tr>
                                    <td>
                                        <?php echo count($userData) - $index; ?>
                                    </td>
                                    <td>
                                        <?php echo htmlspecialchars($user['name'] ?? 'N/A'); ?>
                                    </td>
                                    <td>
                                        <?php echo htmlspecialchars($user['email'] ?? 'N/A'); ?>
                                    </td>
                                    <td>
                                        <?php
                                        if (isset($user['timestamp'])) {
                                            echo date('M d, Y H:i', strtotime($user['timestamp']));
                                        } else {
                                            echo 'N/A';
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <?php echo htmlspecialchars($user['ip'] ?? 'N/A'); ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>
        </div>

        <script>
            // Simple Dark Mode Toggle
            function toggleTheme() {
                document.body.classList.toggle('dark-mode');
                const btn = document.querySelector('.toggle-btn');
                if (document.body.classList.contains('dark-mode')) {
                    btn.textContent = '☀️';
                } else {
                    btn.textContent = '🌙';
                }
            }

            // Basic Chart Setup (Placeholder data)
            const ctx = document.getElementById('growthChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Subscribers',
                        data: [12, 19, 3, 5, 2, 3], // Placeholder
                        borderColor: '#3b82f6',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        </script>
    <?php endif; ?>

</body>

</html>