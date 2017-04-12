# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"

  config.vm.provider :virtualbox do |v|
    v.customize [ "modifyvm", :id, "--cpus", 2 ]
    v.customize [ "modifyvm", :id, "--memory", 1024 ]
  end

  config.vm.provision "ansible_local" do |ansible|
    ansible.galaxy_role_file = "ansible/requirements.yml"
    ansible.galaxy_roles_path = "/vagrant/ansible/roles/galaxy"
    ansible.playbook = "ansible/playbook.yml"
    ansible.verbose = false
    ansible.limit = "all"
    ansible.inventory_path = "ansible/inventory"
  end

  config.vm.synced_folder ".", "/vagrant", type: "nfs"

  # swagger project edit -s -p 40000 --host 0.0.0.0
  config.vm.network "forwarded_port", guest: 40000, host: 40000

  # swagger project start
  config.vm.network "forwarded_port", guest: 10010, host: 10010
end
