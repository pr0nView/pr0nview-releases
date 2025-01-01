type ILayout = {
  name: string;
  id: string;
  gridColumns: string;
  gridRows: string;
  gridAreas: string;
  videoCount: number;
  slideshowCount: number;
}

type IPlaylist = {
  name: string;
  id: string;
  files: IMediaVideo[];
  parentFolder?: string
}

type IMediaVideo = {
  id?: number;
  fileName: string;
  filePath: string;
  type: string;
  metaData?: IVideoMeta;
  isSelected?: boolean;
  tags?: IMediaTag[]
  isConverting?: boolean;
  thumbnailPath?: string
}

type IMediaImage = {
  id?: number;
  fileName: string;
  filePath: string;
  type: string;
  photographer?: string;
  publication?: string;
  metaData?: IImageMeta;
  tags?: IMediaTag[]
  isSelected?: boolean
}

type IImageMeta = {
  width: number;
  height: number;
  sizeOnDisk: number;
  lastModified: number;
}

type IVideoMeta = {
  duration: number;
  width: number;
  height: number;
  sizeOnDisk: number;
  videoCodec: string;
  videoCodecType: string;
  videoBitrate: number;
  audioCodec: string;
  audioCodecType: string;
  audioBitrate: number;
  videoFramerate: number;
  lastModified?: number;
}

type IConverted = {
  id: string;
  originalMedia: IMediaVideo;
  convertedMedia: IMediaVideo;
}

type ISaveFile = {
  layout: ILayout;
  videoPlayers: IVideoPlayer[],
}

type IVideoPlayer = {
  playerId: string;
  playerGridArea: string;
  currentLoadedVideo: IMediaVideo;
  playMode: string;
  localPlaylist: IMediaVideo[];
  playerVolume: number;
}

type IConvertParams = {
  filePath: string;
  fileName: string;
  id: string;
}

type IMainResponse = {
  type: string;
  data: any;
}

type IMediaTag = {
  name: string;
  id?: string
}

type IShortCut = {
  label: string;
  path: string;
  icon: string;
  name: string;
}

type IModel = {
  id: string;
  fullName: string;
  tags: IMediaTag[]
}

type IMeta = {
  modelName: string;
  year?: number;
  photographer?: string;
  publication?: string;
}

type IFileFilters = {
  name: string;
  extensions: string[];
}

type IWatchFolder = {
  alias: string;
  path: string;
}

type IOpenFolderEvent = {
  rootFolder: string;
  mediaType: 'video' | 'image'
  fileTypes: string[];
  builderId: string;
}

type IOpenFilesEvent = {
  rootFolder: string;
  mediaType: 'video' | 'image'
  fileTypes: string[];
  builderId: string;
}

type IDragDropEvent = {
  mediaType: 'video' | 'image'
  fileTypes: string[];
  builderId: string;
}

type TAddVideoTag = { videoId: number, tags: string[] }

type TAddImageTag = { imageId: number, tags: string[] }

type TAddImageModel = { imageId: number, models: string[] }

type TAddVideoModel = { videoId: number, models: string[] }

type TCreateVideoPlaylist = { name: string, description: string }

type TCreateImagePlaylist = { name: string, description: string }

type TDeleteVideoPlaylist = { playListId: number }

type TDeleteImagePlaylist = { playListId: number }

type TAddVideosToPlaylist = { videoIds: number[], playlistId: number }

type TRemoveVideosFromPlaylist = { videoIds: number[], playlistId: number }

type TAddImagesToPlaylist = { imageIds: number[], playlistId: number }

type TRemoveImagesFromPlaylist = { imageIds: number[], playlistId: number }

type TFilePathAndName = { filePath: string, fileName: string }

