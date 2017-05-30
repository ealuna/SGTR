<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <!--<img src="assets/images/logoOriunda.jpg" class="img-circle" alt="User Image">-->
            </div>
            <div class="pull-left info">
                <p><?= $this->session->userdata('cuenta') ?></p>
                <a><i class="glyphicon glyphicon-info-sign"></i> Online</a>
            </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header"><i class="glyphicon glyphicon-inbox"></i>   <strong>Navegador principal</strong></li>
            <li class="treeview">
                <a href="#">
                    <i class="glyphicon glyphicon-user"></i> 
                    <span>Menú de mapa</span>
                    <span class="pull-right-container">
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="<?= base_url('pruebas/pruebas_mapas') ?>"><i class="glyphicon glyphicon-chevron-right"></i> Consulta de clientes</a></li>
                </ul>
            </li>     
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <div class="content">