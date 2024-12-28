IService（接口）

	-RequestService（接口）
		-RequestImp（实现类）
	-StorageService（接口）
		-StorageImp（实现类）



ServiceManager
map<String,IService>{
key:value
key:value
}

	接口服务：key：REQUEST_SERVICE_KEY  value：new RequestImp()
	存储服务：key：STORAGE_SERVICE_KEY  value：new StorageImpl()

	
	save(key:string,value:IService)


registerService()