module.exports = native => {
  const ctx = {
    nbtLoop: (value, buffer, offset) => {
      let size = 1
      for (const val of value) {
        size += ctx.nbt(val, buffer, offset)
      }
      return size
    },
    byterot: (value, buffer, offset) => {
      return 1
    },
    i8: native.i8,
    u8: native.u8,
    i16: native.i16,
    u16: native.u16,
    i32: native.i32,
    u32: native.u32,
    f32: native.f32,
    f64: native.f64,
    li8: native.li8,
    lu8: native.lu8,
    li16: native.li16,
    lu16: native.lu16,
    li32: native.li32,
    lu32: native.lu32,
    lf32: native.lf32,
    lf64: native.lf64,
    i64: native.i64,
    li64: native.li64,
    u64: native.u64,
    lu64: native.lu64,
    varint: native.varint,
    bool: native.bool,
    pstring: native.pstring,
    buffer: native.buffer,
    void: native.void,
    bitfield: native.bitfield,
    cstring: native.cstring,
    mapper: native.mapper,
    varint64: native.varint64,
    uuid: native.uuid,
    restBuffer: native.restBuffer,
    nbt: native.nbt,
    lnbt: native.lnbt,
    zigzag64: native.zigzag64,
    zigzag32: native.zigzag32,
    varint32: function () { return ctx.varint(...arguments) },
    MapInfo: native.MapInfo,
    BehaviourPackInfos: (value) => {
      let size = (ctx.li16)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let uuid = value.uuid
        size += (ctx.string)(uuid)
        let version = value.version
        size += (ctx.string)(version)
        let size1 = value.size
        size += (ctx.lu64)(size1)
        let content_key = value.content_key
        size += (ctx.string)(content_key)
        let sub_pack_name = value.sub_pack_name
        size += (ctx.string)(sub_pack_name)
        let content_identity = value.content_identity
        size += (ctx.string)(content_identity)
        let has_scripts = value.has_scripts
        size += (ctx.bool)(has_scripts)
        return size
      })(value[i])
      }
      return size
    },
    TexturePackInfos: (value) => {
      let size = (ctx.li16)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let uuid = value.uuid
        size += (ctx.string)(uuid)
        let version = value.version
        size += (ctx.string)(version)
        let size1 = value.size
        size += (ctx.lu64)(size1)
        let content_key = value.content_key
        size += (ctx.string)(content_key)
        let sub_pack_name = value.sub_pack_name
        size += (ctx.string)(sub_pack_name)
        let content_identity = value.content_identity
        size += (ctx.string)(content_identity)
        let has_scripts = value.has_scripts
        size += (ctx.bool)(has_scripts)
        let rtx_enabled = value.rtx_enabled
        size += (ctx.bool)(rtx_enabled)
        return size
      })(value[i])
      }
      return size
    },
    ResourcePackIdVersions: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let uuid = value.uuid
        size += (ctx.string)(uuid)
        let version = value.version
        size += (ctx.string)(version)
        let name = value.name
        size += (ctx.string)(name)
        return size
      })(value[i])
      }
      return size
    },
    ResourcePackIds: (value) => {
      let size = (ctx.li16)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += (ctx.string)(value[i])
      }
      return size
    },
    Experiment: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let enabled = value.enabled
      size += (ctx.bool)(enabled)
      return size
    },
    Experiments: (value) => {
      let size = (ctx.li32)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += (ctx.Experiment)(value[i])
      }
      return size
    },
    GameMode: (value) => {
      return (ctx.zigzag32)({"survival":0,"creative":1,"adventure":2,"survival_spectator":3,"creative_spectator":4,"fallback":5}[value] || value)
    },
    GameRule: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let type = value.type
      size += ((value) => {
        return (ctx.varint)({"bool":1,"int":2,"float":3}[value] || value)
      })(type)
      let value1 = value.value
      size += ((value) => {
        switch (type) {
          case "bool": return (ctx.bool)(value)
          case "int": return (ctx.zigzag32)(value)
          case "float": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(value1)
      return size
    },
    GameRules: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += (ctx.GameRule)(value[i])
      }
      return size
    },
    Blob: (value) => {
      let size = 0
      let hash = value.hash
      size += (ctx.lu64)(hash)
      let payload = value.payload
      size += (ctx.ByteArray)(payload)
      return size
    },
    BlockProperties: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let name1 = value.name
        size += (ctx.string)(name1)
        let state = value.state
        size += (ctx.nbt)(state)
        return size
      })(value[i])
      }
      return size
    },
    Itemstates: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let name1 = value.name
        size += (ctx.string)(name1)
        let runtime_id = value.runtime_id
        size += (ctx.li16)(runtime_id)
        let component_based = value.component_based
        size += (ctx.bool)(component_based)
        return size
      })(value[i])
      }
      return size
    },
    ItemExtraDataWithBlockingTick: (value) => {
      let size = 0
      let has_nbt = value.has_nbt
      size += ((value) => {
        return (ctx.lu16)({"false":0,"true":65535}[value] || value)
      })(has_nbt)
      let nbt = value.nbt
      size += ((value) => {
        switch (has_nbt) {
          case true: return ((value) => {
            let size = 0
            let version = value.version
            size += (ctx.u8)(version)
            let nbt1 = value.nbt
            size += (ctx.lnbt)(nbt1)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(nbt)
      let can_place_on = value.can_place_on
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.ShortArray)(value[i])
        }
        return size
      })(can_place_on)
      let can_destroy = value.can_destroy
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.ShortArray)(value[i])
        }
        return size
      })(can_destroy)
      let blocking_tick = value.blocking_tick
      size += (ctx.li64)(blocking_tick)
      return size
    },
    ItemExtraDataWithoutBlockingTick: (value) => {
      let size = 0
      let has_nbt = value.has_nbt
      size += ((value) => {
        return (ctx.lu16)({"false":0,"true":65535}[value] || value)
      })(has_nbt)
      let nbt = value.nbt
      size += ((value) => {
        switch (has_nbt) {
          case true: return ((value) => {
            let size = 0
            let version = value.version
            size += (ctx.u8)(version)
            let nbt1 = value.nbt
            size += (ctx.lnbt)(nbt1)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(nbt)
      let can_place_on = value.can_place_on
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.ShortArray)(value[i])
        }
        return size
      })(can_place_on)
      let can_destroy = value.can_destroy
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.ShortArray)(value[i])
        }
        return size
      })(can_destroy)
      return size
    },
    ItemLegacy: (value) => {
      let size = 0
      let network_id = value.network_id
      size += (ctx.zigzag32)(network_id)
      let count = value.count
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.lu16)(value)
        }
      })(count)
      let metadata = value.metadata
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.varint)(value)
        }
      })(metadata)
      let block_runtime_id = value.block_runtime_id
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.zigzag32)(value)
        }
      })(block_runtime_id)
      let extra = value.extra
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return ((value) => {
            switch (network_id) {
              case ctx.ShieldItemID: return ((value) => {
                const payloadSize = (ctx.ItemExtraDataWithBlockingTick)(value)
                    return (ctx.varint)(payloadSize) + payloadSize
              })(value)
              default: return ((value) => {
                const payloadSize = (ctx.ItemExtraDataWithoutBlockingTick)(value)
                    return (ctx.varint)(payloadSize) + payloadSize
              })(value)
            }
          })(value)
        }
      })(extra)
      return size
    },
    Item: (value) => {
      let size = 0
      let network_id = value.network_id
      size += (ctx.zigzag32)(network_id)
      let count = value.count
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.lu16)(value)
        }
      })(count)
      let metadata = value.metadata
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.varint)(value)
        }
      })(metadata)
      let has_stack_id = value.has_stack_id
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.u8)(value)
        }
      })(has_stack_id)
      let stack_id = value.stack_id
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return ((value) => {
            switch (has_stack_id) {
              case 0: return (ctx.void)(value)
              default: return (ctx.zigzag32)(value)
            }
          })(value)
        }
      })(stack_id)
      let block_runtime_id = value.block_runtime_id
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.zigzag32)(value)
        }
      })(block_runtime_id)
      let extra = value.extra
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return ((value) => {
            switch (network_id) {
              case ctx.ShieldItemID: return ((value) => {
                const payloadSize = (ctx.ItemExtraDataWithBlockingTick)(value)
                    return (ctx.varint)(payloadSize) + payloadSize
              })(value)
              default: return ((value) => {
                const payloadSize = (ctx.ItemExtraDataWithoutBlockingTick)(value)
                    return (ctx.varint)(payloadSize) + payloadSize
              })(value)
            }
          })(value)
        }
      })(extra)
      return size
    },
    vec3i: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.zigzag32)(x)
      let y = value.y
      size += (ctx.zigzag32)(y)
      let z = value.z
      size += (ctx.zigzag32)(z)
      return size
    },
    vec3u: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.varint)(x)
      let y = value.y
      size += (ctx.varint)(y)
      let z = value.z
      size += (ctx.varint)(z)
      return size
    },
    vec3f: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.lf32)(x)
      let y = value.y
      size += (ctx.lf32)(y)
      let z = value.z
      size += (ctx.lf32)(z)
      return size
    },
    vec2f: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.lf32)(x)
      let z = value.z
      size += (ctx.lf32)(z)
      return size
    },
    MetadataDictionary: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let key = value.key
        size += ((value) => {
          return (ctx.varint)({"flags":0,"health":1,"variant":2,"color":3,"nametag":4,"owner_eid":5,"target_eid":6,"air":7,"potion_color":8,"potion_ambient":9,"jump_duration":10,"hurt_time":11,"hurt_direction":12,"paddle_time_left":13,"paddle_time_right":14,"experience_value":15,"minecart_display_block":16,"minecart_display_offset":17,"minecart_has_display":18,"old_swell":20,"swell_dir":21,"charge_amount":22,"enderman_held_runtime_id":23,"entity_age":24,"player_flags":26,"player_index":27,"player_bed_position":28,"fireball_power_x":29,"fireball_power_y":30,"fireball_power_z":31,"aux_power":32,"fish_x":33,"fish_z":34,"fish_angle":35,"potion_aux_value":36,"lead_holder_eid":37,"scale":38,"interactive_tag":39,"npc_skin_id":40,"url_tag":41,"max_airdata_max_air":42,"mark_variant":43,"container_type":44,"container_base_size":45,"container_extra_slots_per_strength":46,"block_target":47,"wither_invulnerable_ticks":48,"wither_target_1":49,"wither_target_2":50,"wither_target_3":51,"aerial_attack":52,"boundingbox_width":53,"boundingbox_height":54,"fuse_length":55,"rider_seat_position":56,"rider_rotation_locked":57,"rider_max_rotation":58,"rider_min_rotation":59,"rider_rotation_offset":60,"area_effect_cloud_radius":61,"area_effect_cloud_waiting":62,"area_effect_cloud_particle_id":63,"shulker_peek_id":64,"shulker_attach_face":65,"shulker_attached":66,"shulker_attach_pos":67,"trading_player_eid":68,"trading_career":69,"has_command_block":70,"command_block_command":71,"command_block_last_output":72,"command_block_track_output":73,"controlling_rider_seat_number":74,"strength":75,"max_strength":76,"spell_casting_color":77,"limited_life":78,"armor_stand_pose_index":79,"ender_crystal_time_offset":80,"always_show_nametag":81,"color_2":82,"name_author":83,"score_tag":84,"balloon_attached_entity":85,"pufferfish_size":86,"bubble_time":87,"agent":88,"sitting_amount":89,"sitting_amount_previous":90,"eating_counter":91,"flags_extended":92,"laying_amount":93,"laying_amount_previous":94,"duration":95,"spawn_time":96,"change_rate":97,"change_on_pickup":98,"pickup_count":99,"interact_text":100,"trade_tier":101,"max_trade_tier":102,"trade_experience":103,"skin_id":104,"spawning_frames":105,"command_block_tick_delay":106,"command_block_execute_on_first_tick":107,"ambient_sound_interval":108,"ambient_sound_interval_range":109,"ambient_sound_event_name":110,"fall_damage_multiplier":111,"name_raw_text":112,"can_ride_target":113,"low_tier_cured_discount":114,"high_tier_cured_discount":115,"nearby_cured_discount":116,"nearby_cured_discount_timestamp":117,"hitbox":118,"is_buoyant":119,"freezing_effect_strength":120,"buoyancy_data":121,"goat_horn_count":122,"base_runtime_id":123,"define_properties":124,"update_properties":125}[value] || value)
        })(key)
        let type1 = value.type
        size += ((value) => {
          return (ctx.varint)({"byte":0,"short":1,"int":2,"float":3,"string":4,"compound":5,"vec3i":6,"long":7,"vec3f":8}[value] || value)
        })(type1)
        let value2 = value.value
        size += ((value) => {
          switch (key) {
            case "flags": return (ctx.MetadataFlags1)(value)
            case "flags_extended": return (ctx.MetadataFlags2)(value)
            default: return ((value) => {
              switch (type1) {
                case "byte": return (ctx.i8)(value)
                case "short": return (ctx.li16)(value)
                case "int": return (ctx.zigzag32)(value)
                case "float": return (ctx.lf32)(value)
                case "string": return (ctx.string)(value)
                case "compound": return (ctx.nbt)(value)
                case "vec3i": return (ctx.vec3i)(value)
                case "long": return (ctx.zigzag64)(value)
                case "vec3f": return (ctx.vec3f)(value)
                default: return (ctx.void)(value)
              }
            })(value)
          }
        })(value2)
        return size
      })(value[i])
      }
      return size
    },
    Link: (value) => {
      let size = 0
      let ridden_entity_id = value.ridden_entity_id
      size += (ctx.zigzag64)(ridden_entity_id)
      let rider_entity_id = value.rider_entity_id
      size += (ctx.zigzag64)(rider_entity_id)
      let type = value.type
      size += (ctx.u8)(type)
      let immediate = value.immediate
      size += (ctx.bool)(immediate)
      let rider_initiated = value.rider_initiated
      size += (ctx.bool)(rider_initiated)
      return size
    },
    Links: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += (ctx.Link)(value[i])
      }
      return size
    },
    EntityAttributes: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let name1 = value.name
        size += (ctx.string)(name1)
        let min = value.min
        size += (ctx.lf32)(min)
        let value2 = value.value
        size += (ctx.lf32)(value2)
        let max = value.max
        size += (ctx.lf32)(max)
        return size
      })(value[i])
      }
      return size
    },
    Rotation: (value) => {
      let size = 0
      let yaw = value.yaw
      size += (ctx.byterot)(yaw)
      let pitch = value.pitch
      size += (ctx.byterot)(pitch)
      let head_yaw = value.head_yaw
      size += (ctx.byterot)(head_yaw)
      return size
    },
    BlockCoordinates: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.zigzag32)(x)
      let y = value.y
      size += (ctx.varint)(y)
      let z = value.z
      size += (ctx.zigzag32)(z)
      return size
    },
    PlayerAttributes: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let min = value.min
        size += (ctx.lf32)(min)
        let max = value.max
        size += (ctx.lf32)(max)
        let current = value.current
        size += (ctx.lf32)(current)
        let default1 = value.default
        size += (ctx.lf32)(default1)
        let name1 = value.name
        size += (ctx.string)(name1)
        return size
      })(value[i])
      }
      return size
    },
    TransactionUseItem: (value) => {
      let size = 0
      let action_type = value.action_type
      size += ((value) => {
        return (ctx.varint)({"click_block":0,"click_air":1,"break_block":2}[value] || value)
      })(action_type)
      let block_position = value.block_position
      size += (ctx.vec3i)(block_position)
      let face = value.face
      size += (ctx.varint)(face)
      let hotbar_slot = value.hotbar_slot
      size += (ctx.varint)(hotbar_slot)
      let held_item = value.held_item
      size += (ctx.Item)(held_item)
      let player_pos = value.player_pos
      size += (ctx.vec3f)(player_pos)
      let click_pos = value.click_pos
      size += (ctx.vec3f)(click_pos)
      let block_runtime_id = value.block_runtime_id
      size += (ctx.varint)(block_runtime_id)
      return size
    },
    TransactionActions: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let source_type = value.source_type
        size += ((value) => {
          return (ctx.varint)({"container":0,"global":1,"world_interaction":2,"creative":3,"craft_slot":100,"craft":99999}[value] || value)
        })(source_type)
        let inventory_id = value.inventory_id
        size += ((value) => {
          switch (source_type) {
            case "container": return (ctx.WindowIDVarint)(value)
            default: return (ctx.void)(value)
          }
        })(inventory_id)
        let action = value.action
        size += ((value) => {
          switch (source_type) {
            case "craft": return (ctx.varint)(value)
            case "craft_slot": return (ctx.varint)(value)
            default: return (ctx.void)(value)
          }
        })(action)
        let flags = value.flags
        size += ((value) => {
          switch (source_type) {
            case "world_interaction": return (ctx.varint)(value)
            default: return (ctx.void)(value)
          }
        })(flags)
        let slot = value.slot
        size += (ctx.varint)(slot)
        let old_item = value.old_item
        size += (ctx.Item)(old_item)
        let new_item = value.new_item
        size += (ctx.Item)(new_item)
        return size
      })(value[i])
      }
      return size
    },
    TransactionLegacy: (value) => {
      let size = 0
      let legacy_request_id = value.legacy_request_id
      size += (ctx.zigzag32)(legacy_request_id)
      let legacy_transactions = value.legacy_transactions
      size += ((value) => {
        switch (legacy_request_id) {
          case 0: return (ctx.void)(value)
          default: return ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += ((value) => {
              let size = 0
              let container_id = value.container_id
              size += (ctx.u8)(container_id)
              let changed_slots = value.changed_slots
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += ((value) => {
                  let size = 0
                  let slot_id = value.slot_id
                  size += (ctx.u8)(slot_id)
                  return size
                })(value[i])
                }
                return size
              })(changed_slots)
              return size
            })(value[i])
            }
            return size
          })(value)
        }
      })(legacy_transactions)
      return size
    },
    Transaction: (value) => {
      let size = 0
      let legacy = value.legacy
      size += (ctx.TransactionLegacy)(legacy)
      let transaction_type = value.transaction_type
      size += ((value) => {
        return (ctx.varint)({"normal":0,"inventory_mismatch":1,"item_use":2,"item_use_on_entity":3,"item_release":4}[value] || value)
      })(transaction_type)
      let actions = value.actions
      size += (ctx.TransactionActions)(actions)
      let transaction_data = value.transaction_data
      size += ((value) => {
        switch (transaction_type) {
          case "normal": return (ctx.void)(value)
          case "inventory_mismatch": return (ctx.void)(value)
          case "item_use": return (ctx.TransactionUseItem)(value)
          case "item_use_on_entity": return ((value) => {
            let size = 0
            let entity_runtime_id = value.entity_runtime_id
            size += (ctx.varint64)(entity_runtime_id)
            let action_type1 = value.action_type
            size += ((value) => {
              return (ctx.varint)({"interact":0,"attack":1}[value] || value)
            })(action_type1)
            let hotbar_slot1 = value.hotbar_slot
            size += (ctx.zigzag32)(hotbar_slot1)
            let held_item1 = value.held_item
            size += (ctx.Item)(held_item1)
            let player_pos1 = value.player_pos
            size += (ctx.vec3f)(player_pos1)
            let click_pos1 = value.click_pos
            size += (ctx.vec3f)(click_pos1)
            return size
          })(value)
          case "item_release": return ((value) => {
            let size = 0
            let action_type1 = value.action_type
            size += ((value) => {
              return (ctx.varint)({"release":0,"consume":1}[value] || value)
            })(action_type1)
            let hotbar_slot1 = value.hotbar_slot
            size += (ctx.zigzag32)(hotbar_slot1)
            let held_item1 = value.held_item
            size += (ctx.Item)(held_item1)
            let head_pos = value.head_pos
            size += (ctx.vec3f)(head_pos)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(transaction_data)
      return size
    },
    ItemStacks: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += (ctx.Item)(value[i])
      }
      return size
    },
    RecipeIngredient: (value) => {
      let size = 0
      let network_id = value.network_id
      size += (ctx.zigzag32)(network_id)
      let network_data = value.network_data
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.zigzag32)(value)
        }
      })(network_data)
      let count = value.count
      size += ((value) => {
        switch (network_id) {
          case 0: return (ctx.void)(value)
          default: return (ctx.zigzag32)(value)
        }
      })(count)
      return size
    },
    PotionTypeRecipes: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let input_item_id = value.input_item_id
        size += (ctx.zigzag32)(input_item_id)
        let input_item_meta = value.input_item_meta
        size += (ctx.zigzag32)(input_item_meta)
        let ingredient_id = value.ingredient_id
        size += (ctx.zigzag32)(ingredient_id)
        let ingredient_meta = value.ingredient_meta
        size += (ctx.zigzag32)(ingredient_meta)
        let output_item_id = value.output_item_id
        size += (ctx.zigzag32)(output_item_id)
        let output_item_meta = value.output_item_meta
        size += (ctx.zigzag32)(output_item_meta)
        return size
      })(value[i])
      }
      return size
    },
    PotionContainerChangeRecipes: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let input_item_id = value.input_item_id
        size += (ctx.zigzag32)(input_item_id)
        let ingredient_id = value.ingredient_id
        size += (ctx.zigzag32)(ingredient_id)
        let output_item_id = value.output_item_id
        size += (ctx.zigzag32)(output_item_id)
        return size
      })(value[i])
      }
      return size
    },
    Recipes: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let type1 = value.type
        size += ((value) => {
          return (ctx.zigzag32)({"shapeless":0,"shaped":1,"furnace":2,"furnace_with_metadata":3,"multi":4,"shulker_box":5,"shapeless_chemistry":6,"shaped_chemistry":7}[value] || value)
        })(type1)
        let recipe = value.recipe
        size += ((value) => {
          switch (type1) {
            case "shapeless": return ((value) => {
              let size = 0
              let recipe_id = value.recipe_id
              size += (ctx.string)(recipe_id)
              let input = value.input
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.RecipeIngredient)(value[i])
                }
                return size
              })(input)
              let output = value.output
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(output)
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let block = value.block
              size += (ctx.string)(block)
              let priority = value.priority
              size += (ctx.zigzag32)(priority)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            case "shulker_box": return ((value) => {
              let size = 0
              let recipe_id = value.recipe_id
              size += (ctx.string)(recipe_id)
              let input = value.input
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.RecipeIngredient)(value[i])
                }
                return size
              })(input)
              let output = value.output
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(output)
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let block = value.block
              size += (ctx.string)(block)
              let priority = value.priority
              size += (ctx.zigzag32)(priority)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            case "shapeless_chemistry": return ((value) => {
              let size = 0
              let recipe_id = value.recipe_id
              size += (ctx.string)(recipe_id)
              let input = value.input
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.RecipeIngredient)(value[i])
                }
                return size
              })(input)
              let output = value.output
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(output)
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let block = value.block
              size += (ctx.string)(block)
              let priority = value.priority
              size += (ctx.zigzag32)(priority)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            case "shaped": return ((value) => {
              let size = 0
              let recipe_id = value.recipe_id
              size += (ctx.string)(recipe_id)
              let width = value.width
              size += (ctx.zigzag32)(width)
              let height = value.height
              size += (ctx.zigzag32)(height)
              let input = value.input
              size += ((value) => {
                let size = 0
                for (let i = 0; i < value.length; i++) {
                  size += ((value) => {
                  let size = 0
                  for (let i = 0; i < value.length; i++) {
                    size += (ctx.RecipeIngredient)(value[i])
                  }
                  return size
                })(value[i])
                }
                return size
              })(input)
              let output = value.output
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(output)
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let block = value.block
              size += (ctx.string)(block)
              let priority = value.priority
              size += (ctx.zigzag32)(priority)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            case "shaped_chemistry": return ((value) => {
              let size = 0
              let recipe_id = value.recipe_id
              size += (ctx.string)(recipe_id)
              let width = value.width
              size += (ctx.zigzag32)(width)
              let height = value.height
              size += (ctx.zigzag32)(height)
              let input = value.input
              size += ((value) => {
                let size = 0
                for (let i = 0; i < value.length; i++) {
                  size += ((value) => {
                  let size = 0
                  for (let i = 0; i < value.length; i++) {
                    size += (ctx.RecipeIngredient)(value[i])
                  }
                  return size
                })(value[i])
                }
                return size
              })(input)
              let output = value.output
              size += ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(output)
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let block = value.block
              size += (ctx.string)(block)
              let priority = value.priority
              size += (ctx.zigzag32)(priority)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            case "furnace": return ((value) => {
              let size = 0
              let input_id = value.input_id
              size += (ctx.zigzag32)(input_id)
              let output = value.output
              size += (ctx.ItemLegacy)(output)
              let block = value.block
              size += (ctx.string)(block)
              return size
            })(value)
            case "furnace_with_metadata": return ((value) => {
              let size = 0
              let input_id = value.input_id
              size += (ctx.zigzag32)(input_id)
              let input_meta = value.input_meta
              size += (ctx.zigzag32)(input_meta)
              let output = value.output
              size += (ctx.ItemLegacy)(output)
              let block = value.block
              size += (ctx.string)(block)
              return size
            })(value)
            case "multi": return ((value) => {
              let size = 0
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let network_id1 = value.network_id
              size += (ctx.varint)(network_id1)
              return size
            })(value)
            default: return (ctx.void)(value)
          }
        })(recipe)
        return size
      })(value[i])
      }
      return size
    },
    SkinImage: (value) => {
      let size = 0
      let width = value.width
      size += (ctx.li32)(width)
      let height = value.height
      size += (ctx.li32)(height)
      let data = value.data
      size += (ctx.ByteArray)(data)
      return size
    },
    Skin: (value) => {
      let size = 0
      let skin_id = value.skin_id
      size += (ctx.string)(skin_id)
      let play_fab_id = value.play_fab_id
      size += (ctx.string)(play_fab_id)
      let skin_resource_pack = value.skin_resource_pack
      size += (ctx.string)(skin_resource_pack)
      let skin_data = value.skin_data
      size += (ctx.SkinImage)(skin_data)
      let animations = value.animations
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let skin_image = value.skin_image
          size += (ctx.SkinImage)(skin_image)
          let animation_type = value.animation_type
          size += (ctx.li32)(animation_type)
          let animation_frames = value.animation_frames
          size += (ctx.lf32)(animation_frames)
          let expression_type = value.expression_type
          size += (ctx.lf32)(expression_type)
          return size
        })(value[i])
        }
        return size
      })(animations)
      let cape_data = value.cape_data
      size += (ctx.SkinImage)(cape_data)
      let geometry_data = value.geometry_data
      size += (ctx.string)(geometry_data)
      let animation_data = value.animation_data
      size += (ctx.string)(animation_data)
      let premium = value.premium
      size += (ctx.bool)(premium)
      let persona = value.persona
      size += (ctx.bool)(persona)
      let cape_on_classic = value.cape_on_classic
      size += (ctx.bool)(cape_on_classic)
      let cape_id = value.cape_id
      size += (ctx.string)(cape_id)
      let full_skin_id = value.full_skin_id
      size += (ctx.string)(full_skin_id)
      let arm_size = value.arm_size
      size += (ctx.string)(arm_size)
      let skin_color = value.skin_color
      size += (ctx.string)(skin_color)
      let personal_pieces = value.personal_pieces
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let piece_id = value.piece_id
          size += (ctx.string)(piece_id)
          let piece_type = value.piece_type
          size += (ctx.string)(piece_type)
          let pack_id = value.pack_id
          size += (ctx.string)(pack_id)
          let is_default_piece = value.is_default_piece
          size += (ctx.bool)(is_default_piece)
          let product_id = value.product_id
          size += (ctx.string)(product_id)
          return size
        })(value[i])
        }
        return size
      })(personal_pieces)
      let piece_tint_colors = value.piece_tint_colors
      size += ((value) => {
        let size = (ctx.li32)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let piece_type = value.piece_type
          size += (ctx.string)(piece_type)
          let colors = value.colors
          size += ((value) => {
            let size = (ctx.li32)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(colors)
          return size
        })(value[i])
        }
        return size
      })(piece_tint_colors)
      return size
    },
    PlayerRecords: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.u8)({"add":0,"remove":1}[value] || value)
      })(type)
      let records_count = value.records_count
      size += (ctx.varint)(records_count)
      let records = value.records
      size += ((value) => {
        let size = 0
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          switch (type) {
            case "add": return ((value) => {
              let size = 0
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              let entity_unique_id = value.entity_unique_id
              size += (ctx.zigzag64)(entity_unique_id)
              let username = value.username
              size += (ctx.string)(username)
              let xbox_user_id = value.xbox_user_id
              size += (ctx.string)(xbox_user_id)
              let platform_chat_id = value.platform_chat_id
              size += (ctx.string)(platform_chat_id)
              let build_platform = value.build_platform
              size += (ctx.li32)(build_platform)
              let skin_data1 = value.skin_data
              size += (ctx.Skin)(skin_data1)
              let is_teacher = value.is_teacher
              size += (ctx.bool)(is_teacher)
              let is_host = value.is_host
              size += (ctx.bool)(is_host)
              return size
            })(value)
            case "remove": return ((value) => {
              let size = 0
              let uuid = value.uuid
              size += (ctx.uuid)(uuid)
              return size
            })(value)
            default: return (ctx.void)(value)
          }
        })(value[i])
        }
        return size
      })(records)
      let verified = value.verified
      size += ((value) => {
        switch (type) {
          case "add": return ((value) => {
            let size = 0
            for (let i = 0; i < value.length; i++) {
              size += (ctx.bool)(value[i])
            }
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(verified)
      return size
    },
    Enchant: (value) => {
      let size = 0
      let id = value.id
      size += (ctx.u8)(id)
      let level = value.level
      size += (ctx.u8)(level)
      return size
    },
    EnchantOption: (value) => {
      let size = 0
      let cost = value.cost
      size += (ctx.varint)(cost)
      let slot_flags = value.slot_flags
      size += (ctx.li32)(slot_flags)
      let equip_enchants = value.equip_enchants
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Enchant)(value[i])
        }
        return size
      })(equip_enchants)
      let held_enchants = value.held_enchants
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Enchant)(value[i])
        }
        return size
      })(held_enchants)
      let self_enchants = value.self_enchants
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Enchant)(value[i])
        }
        return size
      })(self_enchants)
      let name = value.name
      size += (ctx.string)(name)
      let option_id = value.option_id
      size += (ctx.zigzag32)(option_id)
      return size
    },
    Action: (value) => {
      return (ctx.zigzag32)({"start_break":0,"abort_break":1,"stop_break":2,"get_updated_block":3,"drop_item":4,"start_sleeping":5,"stop_sleeping":6,"respawn":7,"jump":8,"start_sprint":9,"stop_sprint":10,"start_sneak":11,"stop_sneak":12,"creative_player_destroy_block":13,"dimension_change_ack":14,"start_glide":15,"stop_glide":16,"build_denied":17,"crack_break":18,"change_skin":19,"set_enchatnment_seed":20,"swimming":21,"stop_swimming":22,"start_spin_attack":23,"stop_spin_attack":24,"interact_block":25,"predict_break":26,"continue_break":27}[value] || value)
    },
    StackRequestSlotInfo: (value) => {
      let size = 0
      let slot_type = value.slot_type
      size += (ctx.ContainerSlotType)(slot_type)
      let slot = value.slot
      size += (ctx.u8)(slot)
      let stack_id = value.stack_id
      size += (ctx.zigzag32)(stack_id)
      return size
    },
    ItemStackRequest: (value) => {
      let size = 0
      let request_id = value.request_id
      size += (ctx.varint)(request_id)
      let actions = value.actions
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let type_id = value.type_id
          size += ((value) => {
            return (ctx.u8)({"take":0,"place":1,"swap":2,"drop":3,"destroy":4,"consume":5,"create":6,"lab_table_combine":7,"beacon_payment":8,"mine_block":9,"craft_recipe":10,"craft_recipe_auto":11,"craft_creative":12,"optional":13,"non_implemented":14,"results_deprecated":15}[value] || value)
          })(type_id)
          let count1 = value.count
          size += ((value) => {
            switch (type_id) {
              case "take": return (ctx.u8)(value)
              case "place": return (ctx.u8)(value)
              case "drop": return (ctx.u8)(value)
              case "destroy": return (ctx.u8)(value)
              case "consume": return (ctx.u8)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(count1)
          let source = value.source
          size += ((value) => {
            switch (type_id) {
              case "take": return (ctx.StackRequestSlotInfo)(value)
              case "place": return (ctx.StackRequestSlotInfo)(value)
              case "swap": return (ctx.StackRequestSlotInfo)(value)
              case "drop": return (ctx.StackRequestSlotInfo)(value)
              case "destroy": return (ctx.StackRequestSlotInfo)(value)
              case "consume": return (ctx.StackRequestSlotInfo)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(source)
          let destination = value.destination
          size += ((value) => {
            switch (type_id) {
              case "take": return (ctx.StackRequestSlotInfo)(value)
              case "place": return (ctx.StackRequestSlotInfo)(value)
              case "swap": return (ctx.StackRequestSlotInfo)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(destination)
          let randomly = value.randomly
          size += ((value) => {
            switch (type_id) {
              case "drop": return (ctx.bool)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(randomly)
          let result_slot_id = value.result_slot_id
          size += ((value) => {
            switch (type_id) {
              case "create": return (ctx.u8)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(result_slot_id)
          let primary_effect = value.primary_effect
          size += ((value) => {
            switch (type_id) {
              case "beacon_payment": return (ctx.zigzag32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(primary_effect)
          let secondary_effect = value.secondary_effect
          size += ((value) => {
            switch (type_id) {
              case "beacon_payment": return (ctx.zigzag32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(secondary_effect)
          let unknown1 = value.unknown1
          size += ((value) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(unknown1)
          let predicted_durability = value.predicted_durability
          size += ((value) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(predicted_durability)
          let network_id1 = value.network_id
          size += ((value) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(network_id1)
          let recipe_network_id = value.recipe_network_id
          size += ((value) => {
            switch (type_id) {
              case "craft_recipe": return (ctx.varint)(value)
              case "craft_recipe_auto": return (ctx.varint)(value)
              case "optional": return (ctx.varint)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(recipe_network_id)
          let item_id = value.item_id
          size += ((value) => {
            switch (type_id) {
              case "craft_creative": return (ctx.varint32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(item_id)
          let filtered_string_index = value.filtered_string_index
          size += ((value) => {
            switch (type_id) {
              case "optional": return (ctx.li32)(value)
              case "non_implemented": return (ctx.void)(value)
              default: return (ctx.void)(value)
            }
          })(filtered_string_index)
          let result_items = value.result_items
          size += ((value) => {
            switch (type_id) {
              case "non_implemented": return (ctx.void)(value)
              case "results_deprecated": return ((value) => {
                let size = (ctx.varint)(value.length)
                for (let i = 0; i < value.length; i++) {
                  size += (ctx.ItemLegacy)(value[i])
                }
                return size
              })(value)
              default: return (ctx.void)(value)
            }
          })(result_items)
          let times_crafted = value.times_crafted
          size += ((value) => {
            switch (type_id) {
              case "non_implemented": return (ctx.void)(value)
              case "results_deprecated": return (ctx.u8)(value)
              default: return (ctx.void)(value)
            }
          })(times_crafted)
          return size
        })(value[i])
        }
        return size
      })(actions)
      let custom_names = value.custom_names
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.string)(value[i])
        }
        return size
      })(custom_names)
      return size
    },
    ItemStackResponses: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let status = value.status
        size += ((value) => {
          return (ctx.u8)({"ok":0,"error":1}[value] || value)
        })(status)
        let request_id1 = value.request_id
        size += (ctx.varint32)(request_id1)
        let containers = value.containers
        size += ((value) => {
          switch (status) {
            case "ok": return ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += ((value) => {
                let size = 0
                let slot_type1 = value.slot_type
                size += (ctx.ContainerSlotType)(slot_type1)
                let slots = value.slots
                size += ((value) => {
                  let size = (ctx.varint)(value.length)
                  for (let i = 0; i < value.length; i++) {
                    size += ((value) => {
                    let size = 0
                    let slot1 = value.slot
                    size += (ctx.u8)(slot1)
                    let hotbar_slot1 = value.hotbar_slot
                    size += (ctx.u8)(hotbar_slot1)
                    let count1 = value.count
                    size += (ctx.u8)(count1)
                    let item_stack_id = value.item_stack_id
                    size += (ctx.varint32)(item_stack_id)
                    let custom_name = value.custom_name
                    size += (ctx.string)(custom_name)
                    let durability_correction = value.durability_correction
                    size += (ctx.zigzag32)(durability_correction)
                    return size
                  })(value[i])
                  }
                  return size
                })(slots)
                return size
              })(value[i])
              }
              return size
            })(value)
            default: return (ctx.void)(value)
          }
        })(containers)
        return size
      })(value[i])
      }
      return size
    },
    ItemComponentList: (value) => {
      let size = (ctx.varint)(value.length)
      for (let i = 0; i < value.length; i++) {
        size += ((value) => {
        let size = 0
        let name1 = value.name
        size += (ctx.string)(name1)
        let nbt1 = value.nbt
        size += (ctx.nbt)(nbt1)
        return size
      })(value[i])
      }
      return size
    },
    CommandOrigin: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.varint)({"player":0,"block":1,"minecart_block":2,"dev_console":3,"test":4,"automation_player":5,"client_automation":6,"dedicated_server":7,"entity":8,"virtual":9,"game_argument":10,"entity_server":11,"precompiled":12,"game_director_entity_server":13,"script":14}[value] || value)
      })(type)
      let uuid = value.uuid
      size += (ctx.uuid)(uuid)
      let request_id = value.request_id
      size += (ctx.string)(request_id)
      let player_entity_id = value.player_entity_id
      size += ((value) => {
        switch (type) {
          case "dev_console": return ((value) => {
            let size = 0
            let player_entity_id1 = value.player_entity_id
            size += (ctx.zigzag64)(player_entity_id1)
            return size
          })(value)
          case "test": return ((value) => {
            let size = 0
            let player_entity_id1 = value.player_entity_id
            size += (ctx.zigzag64)(player_entity_id1)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(player_entity_id)
      return size
    },
    TrackedObject: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.li32)({"entity":0,"block":1}[value] || value)
      })(type)
      let entity_unique_id = value.entity_unique_id
      size += ((value) => {
        switch (type) {
          case "entity": return (ctx.zigzag64)(value)
          default: return (ctx.void)(value)
        }
      })(entity_unique_id)
      let block_position = value.block_position
      size += ((value) => {
        switch (type) {
          case "block": return (ctx.BlockCoordinates)(value)
          default: return (ctx.void)(value)
        }
      })(block_position)
      return size
    },
    MapDecoration: (value) => {
      let size = 0
      let type = value.type
      size += (ctx.u8)(type)
      let rotation = value.rotation
      size += (ctx.u8)(rotation)
      let x = value.x
      size += (ctx.u8)(x)
      let y = value.y
      size += (ctx.u8)(y)
      let label = value.label
      size += (ctx.string)(label)
      let color_abgr = value.color_abgr
      size += (ctx.varint)(color_abgr)
      return size
    },
    StructureBlockSettings: (value) => {
      let size = 0
      let palette_name = value.palette_name
      size += (ctx.string)(palette_name)
      let ignore_entities = value.ignore_entities
      size += (ctx.bool)(ignore_entities)
      let ignore_blocks = value.ignore_blocks
      size += (ctx.bool)(ignore_blocks)
      let size1 = value.size
      size += (ctx.BlockCoordinates)(size1)
      let structure_offset = value.structure_offset
      size += (ctx.BlockCoordinates)(structure_offset)
      let last_editing_player_unique_id = value.last_editing_player_unique_id
      size += (ctx.zigzag64)(last_editing_player_unique_id)
      let rotation = value.rotation
      size += (ctx.u8)(rotation)
      let mirror = value.mirror
      size += (ctx.u8)(mirror)
      let integrity = value.integrity
      size += (ctx.lf32)(integrity)
      let seed = value.seed
      size += (ctx.lu32)(seed)
      let pivot = value.pivot
      size += (ctx.vec3f)(pivot)
      return size
    },
    WindowID: (value) => {
      return (ctx.i8)({"inventory":0,"first":1,"last":100,"offhand":119,"armor":120,"creative":121,"hotbar":122,"fixed_inventory":123,"ui":124,"drop_contents":-100,"beacon":-24,"trading_output":-23,"trading_use_inputs":-22,"trading_input_2":-21,"trading_input_1":-20,"enchant_output":-17,"enchant_material":-16,"enchant_input":-15,"anvil_output":-13,"anvil_result":-12,"anvil_material":-11,"container_input":-10,"crafting_use_ingredient":-5,"crafting_result":-4,"crafting_remove_ingredient":-3,"crafting_add_ingredient":-2,"none":-1}[value] || value)
    },
    WindowIDVarint: (value) => {
      return (ctx.varint)({"inventory":0,"first":1,"last":100,"offhand":119,"armor":120,"creative":121,"hotbar":122,"fixed_inventory":123,"ui":124,"drop_contents":-100,"beacon":-24,"trading_output":-23,"trading_use_inputs":-22,"trading_input_2":-21,"trading_input_1":-20,"enchant_output":-17,"enchant_material":-16,"enchant_input":-15,"anvil_output":-13,"anvil_result":-12,"anvil_material":-11,"container_input":-10,"crafting_use_ingredient":-5,"crafting_result":-4,"crafting_remove_ingredient":-3,"crafting_add_ingredient":-2,"none":-1}[value] || value)
    },
    WindowType: (value) => {
      return (ctx.i8)({"container":0,"workbench":1,"furnace":2,"enchantment":3,"brewing_stand":4,"anvil":5,"dispenser":6,"dropper":7,"hopper":8,"cauldron":9,"minecart_chest":10,"minecart_hopper":11,"horse":12,"beacon":13,"structure_editor":14,"trading":15,"command_block":16,"jukebox":17,"armor":18,"hand":19,"compound_creator":20,"element_constructor":21,"material_reducer":22,"lab_table":23,"loom":24,"lectern":25,"grindstone":26,"blast_furnace":27,"smoker":28,"stonecutter":29,"cartography":30,"hud":31,"jigsaw_editor":32,"smithing_table":33,"none":-9,"inventory":-1}[value] || value)
    },
    ContainerSlotType: (value) => {
      return (ctx.u8)({"anvil_input":0,"anvil_material":1,"anvil_result":2,"smithing_table_input":3,"smithing_table_material":4,"smithing_table_result":5,"armor":6,"container":7,"beacon_payment":8,"brewing_input":9,"brewing_result":10,"brewing_fuel":11,"hotbar_and_inventory":12,"crafting_input":13,"crafting_output":14,"recipe_construction":15,"recipe_nature":16,"recipe_items":17,"recipe_search":18,"recipe_search_bar":19,"recipe_equipment":20,"enchanting_input":21,"enchanting_lapis":22,"furnace_fuel":23,"furnace_ingredient":24,"furnace_output":25,"horse_equip":26,"hotbar":27,"inventory":28,"shulker":29,"trade_ingredient1":30,"trade_ingredient2":31,"trade_result":32,"offhand":33,"compcreate_input":34,"compcreate_output":35,"elemconstruct_output":36,"matreduce_input":37,"matreduce_output":38,"labtable_input":39,"loom_input":40,"loom_dye":41,"loom_material":42,"loom_result":43,"blast_furnace_ingredient":44,"smoker_ingredient":45,"trade2_ingredient1":46,"trade2_ingredient2":47,"trade2_result":48,"grindstone_input":49,"grindstone_additional":50,"grindstone_result":51,"stonecutter_input":52,"stonecutter_result":53,"cartography_input":54,"cartography_additional":55,"cartography_result":56,"barrel":57,"cursor":58,"creative_output":59}[value] || value)
    },
    SoundType: (value) => {
      return (ctx.varint)({"ItemUseOn":0,"Hit":1,"Step":2,"Fly":3,"Jump":4,"Break":5,"Place":6,"HeavyStep":7,"Gallop":8,"Fall":9,"Ambient":10,"AmbientBaby":11,"AmbientInWater":12,"Breathe":13,"Death":14,"DeathInWater":15,"DeathToZombie":16,"Hurt":17,"HurtInWater":18,"Mad":19,"Boost":20,"Bow":21,"SquishBig":22,"SquishSmall":23,"FallBig":24,"FallSmall":25,"Splash":26,"Fizz":27,"Flap":28,"Swim":29,"Drink":30,"Eat":31,"Takeoff":32,"Shake":33,"Plop":34,"Land":35,"Saddle":36,"Armor":37,"MobArmorStandPlace":38,"AddChest":39,"Throw":40,"Attack":41,"AttackNoDamage":42,"AttackStrong":43,"Warn":44,"Shear":45,"Milk":46,"Thunder":47,"Explode":48,"Fire":49,"Ignite":50,"Fuse":51,"Stare":52,"Spawn":53,"Shoot":54,"BreakBlock":55,"Launch":56,"Blast":57,"LargeBlast":58,"Twinkle":59,"Remedy":60,"Infect":61,"LevelUp":62,"BowHit":63,"BulletHit":64,"ExtinguishFire":65,"ItemFizz":66,"ChestOpen":67,"ChestClosed":68,"ShulkerBoxOpen":69,"ShulkerBoxClosed":70,"EnderChestOpen":71,"EnderChestClosed":72,"PowerOn":73,"PowerOff":74,"Attach":75,"Detach":76,"Deny":77,"Tripod":78,"Pop":79,"DropSlot":80,"Note":81,"Thorns":82,"PistonIn":83,"PistonOut":84,"Portal":85,"Water":86,"LavaPop":87,"Lava":88,"Burp":89,"BucketFillWater":90,"BucketFillLava":91,"BucketEmptyWater":92,"BucketEmptyLava":93,"ArmorEquipChain":94,"ArmorEquipDiamond":95,"ArmorEquipGeneric":96,"ArmorEquipGold":97,"ArmorEquipIron":98,"ArmorEquipLeather":99,"ArmorEquipElytra":100,"Record13":101,"RecordCat":102,"RecordBlocks":103,"RecordChirp":104,"RecordFar":105,"RecordMall":106,"RecordMellohi":107,"RecordStal":108,"RecordStrad":109,"RecordWard":110,"Record11":111,"RecordWait":112,"unknown1":113,"Flop":114,"ElderGuardianCurse":115,"MobWarning":116,"MobWarningBaby":117,"Teleport":118,"ShulkerOpen":119,"ShulkerClose":120,"Haggle":121,"HaggleYes":122,"HaggleNo":123,"HaggleIdle":124,"ChorusGrow":125,"ChorusDeath":126,"Glass":127,"PotionBrewed":128,"CastSpell":129,"PrepareAttack":130,"PrepareSummon":131,"PrepareWololo":132,"Fang":133,"Charge":134,"CameraTakePicture":135,"LeashKnotPlace":136,"LeashKnotBreak":137,"Growl":138,"Whine":139,"Pant":140,"Purr":141,"Purreow":142,"DeathMinVolume":143,"DeathMidVolume":144,"unknown2":145,"ImitateCaveSpider":146,"ImitateCreeper":147,"ImitateElderGuardian":148,"ImitateEnderDragon":149,"ImitateEnderman":150,"unknown3":151,"ImitateEvocationIllager":152,"ImitateGhast":153,"ImitateHusk":154,"ImitateIllusionIllager":155,"ImitateMagmaCube":156,"ImitatePolarBear":157,"ImitateShulker":158,"ImitateSilverfish":159,"ImitateSkeleton":160,"ImitateSlime":161,"ImitateSpider":162,"ImitateStray":163,"ImitateVex":164,"ImitateVindicationIllager":165,"ImitateWitch":166,"ImitateWither":167,"ImitateWitherSkeleton":168,"ImitateWolf":169,"ImitateZombie":170,"ImitateZombiePigman":171,"ImitateZombieVillager":172,"BlockEndPortalFrameFill":173,"BlockEndPortalSpawn":174,"RandomAnvilUse":175,"BottleDragonBreath":176,"PortalTravel":177,"ItemTridentHit":178,"ItemTridentReturn":179,"ItemTridentRiptide1":180,"ItemTridentRiptide2":181,"ItemTridentRiptide3":182,"ItemTridentThrow":183,"ItemTridentThunder":184,"ItemTridentHitGround":185,"Default":186,"BlockFletchingTableUse":187,"ElemConstructOpen":188,"IceBombHit":189,"BalloonPop":190,"LtReactionIceBomb":191,"LtReactionBleach":192,"LtReactionEPaste":193,"LtReactionEPaste2":194,"LtReactionFertilizer":195,"LtReactionFireball":196,"LtReactionMgsalt":197,"LtReactionMiscfire":198,"LtReactionFire":199,"LtReactionMiscexplosion":200,"LtReactionMiscmystical":201,"LtReactionMiscmystical2":202,"LtReactionProduct":203,"SparklerUse":204,"GlowstickUse":205,"SparklerActive":206,"ConvertToDrowned":207,"BucketFillFish":208,"BucketEmptyFish":209,"BubbleUp":210,"BubbleDown":211,"BubblePop":212,"BubbleUpInside":213,"BubbleDownInside":214,"HurtBaby":215,"DeathBaby":216,"StepBaby":217,"BabySpawn":218,"Born":219,"BlockTurtleEggBreak":220,"BlockTurtleEggCrack":221,"BlockTurtleEggHatch":222,"TurtleLayEgg":223,"BlockTurtleEggAttack":224,"BeaconActivate":225,"BeaconAmbient":226,"BeaconDeactivate":227,"BeaconPower":228,"ConduitActivate":229,"ConduitAmbient":230,"ConduitAttack":231,"ConduitDeactivate":232,"ConduitShort":233,"Swoop":234,"BlockBambooSaplingPlace":235,"PreSneeze":236,"Sneeze":237,"AmbientTame":238,"Scared":239,"BlockScaffoldingClimb":240,"CrossbowLoadingStart":241,"CrossbowLoadingMiddle":242,"CrossbowLoadingEnd":243,"CrossbowShoot":244,"CrossbowQuickChargeStart":245,"CrossbowQuickChargeMiddle":246,"CrossbowQuickChargeEnd":247,"AmbientAggressive":248,"AmbientWorried":249,"CantBreed":250,"ItemShieldBlock":251,"ItemBookPut":252,"BlockGrindstoneUse":253,"BlockBellHit":254,"BlockCampfireCrackle":255,"Roar":256,"Stun":257,"BlockSweetBerryBushHurt":258,"BlockSweetBerryBushPick":259,"UICartographyTableTakeResult":260,"UIStoneCutterTakeResult":261,"BlockComposterEmpty":262,"BlockComposterFill":263,"BlockComposterFillSuccess":264,"BlockComposterReady":265,"BlockBarrelOpen":266,"BlockBarrelClose":267,"RaidHorn":268,"BlockLoomUse":269,"AmbientRaid":270,"UICartographyTableUse":271,"UIStoneCutterUse":272,"UILoomUse":273,"SmokerUse":274,"BlastFurnaceUse":275,"SmithingTableUse":276,"Screech":277,"Sleep":278,"FurnaceUse":279,"MooshroomConvert":280,"MilkSuspiciously":281,"Celebrate":282,"JumpPrevent":283,"AmbientPollinate":284,"BeeHiveDrip":285,"BeeHiveEnter":286,"BeeHiveExit":287,"BeeHiveWork":288,"BeeHiveShear":289,"HoneyBottleDrink":290,"AmbientCave":291,"Retreat":292,"ConvertToZombified":293,"Admire":294,"StepLava":295,"Tempt":296,"Panic":297,"Angry":298,"AmbientWarpedForest":299,"AmbientSoulsandValley":300,"AmbientNetherWastes":301,"AmbientBasaltDeltas":302,"AmbientCrimsonForest":303,"RespawnAnchorCharge":304,"RespawnAnchorDeplete":305,"RespawnAnchorSetSpawn":306,"RespawnAnchorAmbient":307,"SoulEscapeQuiet":308,"SoulEscapeLoud":309,"RecordPigstep":310,"LinkCompassToLodestone":311,"BlockSmithingTableUse":312,"EquipNetherite":313,"AmbientLoopWarpedForest":314,"AmbientLoopSoulsandValley":315,"AmbientLoopNetherWastes":316,"AmbientLoopBasaltDeltas":317,"AmbientLoopCrimsonForest":318,"AmbientAdditionWarpedForest":319,"AmbientAdditionSoulsandValley":320,"AmbientAdditionNetherWastes":321,"AmbientAdditionBasaltDeltas":322,"AmbientAdditionCrimsonForest":323,"SculkSensorPowerOn":324,"SculkSensorPowerOff":325,"BucketFillPowderSnow":326,"BucketEmptyPowderSnow":327,"PointedDripstoneCauldronDripWater":328,"PointedDripstoneCauldronDripLava":329,"PointedDripstoneDripWater":330,"PointedDripstoneDripLava":331,"CaveVinesPickBerries":332,"BigDripleafTiltDown":333,"BigDripleafTiltUp":334,"Undefined":335}[value] || value)
    },
    LegacyEntityType: (value) => {
      return (ctx.li32)({"chicken":10,"cow":11,"pig":12,"sheep":13,"wolf":14,"villager":15,"mooshroom":16,"squid":17,"rabbit":18,"bat":19,"iron_golem":20,"snow_golem":21,"ocelot":22,"horse":23,"donkey":24,"mule":25,"skeleton_horse":26,"zombie_horse":27,"polar_bear":28,"llama":29,"parrot":30,"dolphin":31,"zombie":32,"creeper":33,"skeleton":34,"spider":35,"zombie_pigman":36,"slime":37,"enderman":38,"silverfish":39,"cave_spider":40,"ghast":41,"magma_cube":42,"blaze":43,"zombie_villager":44,"witch":45,"stray":46,"husk":47,"wither_skeleton":48,"guardian":49,"elder_guardian":50,"npc":51,"wither":52,"ender_dragon":53,"shulker":54,"endermite":55,"agent":56,"vindicator":57,"phantom":58,"armor_stand":61,"tripod_camera":62,"player":63,"item":64,"tnt":65,"falling_block":66,"moving_block":67,"xp_bottle":68,"xp_orb":69,"eye_of_ender_signal":70,"ender_crystal":71,"fireworks_rocket":72,"thrown_trident":73,"turtle":74,"cat":75,"shulker_bullet":76,"fishing_hook":77,"chalkboard":78,"dragon_fireball":79,"arrow":80,"snowball":81,"egg":82,"painting":83,"minecart":84,"fireball":85,"splash_potion":86,"ender_pearl":87,"leash_knot":88,"wither_skull":89,"boat":90,"wither_skull_dangerous":91,"lightning_bolt":93,"small_fireball":94,"area_effect_cloud":95,"hopper_minecart":96,"tnt_minecart":97,"chest_minecart":98,"command_block_minecart":100,"lingering_potion":101,"llama_spit":102,"evocation_fang":103,"evocation_illager":104,"vex":105,"ice_bomb":106,"balloon":107,"pufferfish":108,"salmon":109,"drowned":110,"tropicalfish":111,"cod":112,"panda":113}[value] || value)
    },
    mcpe_packet: (value) => {
      let size = 0
      let name = value.name
      size += ((value) => {
        return (ctx.varint)({"login":1,"play_status":2,"server_to_client_handshake":3,"client_to_server_handshake":4,"disconnect":5,"resource_packs_info":6,"resource_pack_stack":7,"resource_pack_client_response":8,"text":9,"set_time":10,"start_game":11,"add_player":12,"add_entity":13,"remove_entity":14,"add_item_entity":15,"take_item_entity":17,"move_entity":18,"move_player":19,"rider_jump":20,"update_block":21,"add_painting":22,"tick_sync":23,"level_sound_event_old":24,"level_event":25,"block_event":26,"entity_event":27,"mob_effect":28,"update_attributes":29,"inventory_transaction":30,"mob_equipment":31,"mob_armor_equipment":32,"interact":33,"block_pick_request":34,"entity_pick_request":35,"player_action":36,"hurt_armor":38,"set_entity_data":39,"set_entity_motion":40,"set_entity_link":41,"set_health":42,"set_spawn_position":43,"animate":44,"respawn":45,"container_open":46,"container_close":47,"player_hotbar":48,"inventory_content":49,"inventory_slot":50,"container_set_data":51,"crafting_data":52,"crafting_event":53,"gui_data_pick_item":54,"adventure_settings":55,"block_entity_data":56,"player_input":57,"level_chunk":58,"set_commands_enabled":59,"set_difficulty":60,"change_dimension":61,"set_player_game_type":62,"player_list":63,"simple_event":64,"event":65,"spawn_experience_orb":66,"clientbound_map_item_data":67,"map_info_request":68,"request_chunk_radius":69,"chunk_radius_update":70,"item_frame_drop_item":71,"game_rules_changed":72,"camera":73,"boss_event":74,"show_credits":75,"available_commands":76,"command_request":77,"command_block_update":78,"command_output":79,"update_trade":80,"update_equipment":81,"resource_pack_data_info":82,"resource_pack_chunk_data":83,"resource_pack_chunk_request":84,"transfer":85,"play_sound":86,"stop_sound":87,"set_title":88,"add_behavior_tree":89,"structure_block_update":90,"show_store_offer":91,"purchase_receipt":92,"player_skin":93,"sub_client_login":94,"initiate_web_socket_connection":95,"set_last_hurt_by":96,"book_edit":97,"npc_request":98,"photo_transfer":99,"modal_form_request":100,"modal_form_response":101,"server_settings_request":102,"server_settings_response":103,"show_profile":104,"set_default_game_type":105,"remove_objective":106,"set_display_objective":107,"set_score":108,"lab_table":109,"update_block_synced":110,"move_entity_delta":111,"set_scoreboard_identity":112,"set_local_player_as_initialized":113,"update_soft_enum":114,"network_stack_latency":115,"script_custom_event":117,"spawn_particle_effect":118,"available_entity_identifiers":119,"level_sound_event_v2":120,"network_chunk_publisher_update":121,"biome_definition_list":122,"level_sound_event":123,"level_event_generic":124,"lectern_update":125,"video_stream_connect":126,"add_ecs_entity":127,"remove_ecs_entity":128,"client_cache_status":129,"on_screen_texture_animation":130,"map_create_locked_copy":131,"structure_template_data_export_request":132,"structure_template_data_export_response":133,"update_block_properties":134,"client_cache_blob_status":135,"client_cache_miss_response":136,"education_settings":137,"multiplayer_settings":139,"settings_command":140,"anvil_damage":141,"completed_using_item":142,"network_settings":143,"player_auth_input":144,"creative_content":145,"player_enchant_options":146,"item_stack_request":147,"item_stack_response":148,"player_armor_damage":149,"update_player_game_type":151,"position_tracking_db_broadcast":153,"position_tracking_db_request":154,"packet_violation_warning":156,"motion_prediction_hints":157,"animate_entity":158,"camera_shake":159,"player_fog":160,"correct_player_move_prediction":161,"item_component":162,"filter_text_packet":163,"debug_renderer":164}[value] || value)
      })(name)
      let params = value.params
      size += ((value) => {
        switch (name) {
          case "login": return (ctx.packet_login)(value)
          case "play_status": return (ctx.packet_play_status)(value)
          case "server_to_client_handshake": return (ctx.packet_server_to_client_handshake)(value)
          case "client_to_server_handshake": return (ctx.packet_client_to_server_handshake)(value)
          case "disconnect": return (ctx.packet_disconnect)(value)
          case "resource_packs_info": return (ctx.packet_resource_packs_info)(value)
          case "resource_pack_stack": return (ctx.packet_resource_pack_stack)(value)
          case "resource_pack_client_response": return (ctx.packet_resource_pack_client_response)(value)
          case "text": return (ctx.packet_text)(value)
          case "set_time": return (ctx.packet_set_time)(value)
          case "start_game": return (ctx.packet_start_game)(value)
          case "add_player": return (ctx.packet_add_player)(value)
          case "add_entity": return (ctx.packet_add_entity)(value)
          case "remove_entity": return (ctx.packet_remove_entity)(value)
          case "add_item_entity": return (ctx.packet_add_item_entity)(value)
          case "take_item_entity": return (ctx.packet_take_item_entity)(value)
          case "move_entity": return (ctx.packet_move_entity)(value)
          case "move_player": return (ctx.packet_move_player)(value)
          case "rider_jump": return (ctx.packet_rider_jump)(value)
          case "update_block": return (ctx.packet_update_block)(value)
          case "add_painting": return (ctx.packet_add_painting)(value)
          case "tick_sync": return (ctx.packet_tick_sync)(value)
          case "level_sound_event_old": return (ctx.packet_level_sound_event_old)(value)
          case "level_event": return (ctx.packet_level_event)(value)
          case "block_event": return (ctx.packet_block_event)(value)
          case "entity_event": return (ctx.packet_entity_event)(value)
          case "mob_effect": return (ctx.packet_mob_effect)(value)
          case "update_attributes": return (ctx.packet_update_attributes)(value)
          case "inventory_transaction": return (ctx.packet_inventory_transaction)(value)
          case "mob_equipment": return (ctx.packet_mob_equipment)(value)
          case "mob_armor_equipment": return (ctx.packet_mob_armor_equipment)(value)
          case "interact": return (ctx.packet_interact)(value)
          case "block_pick_request": return (ctx.packet_block_pick_request)(value)
          case "entity_pick_request": return (ctx.packet_entity_pick_request)(value)
          case "player_action": return (ctx.packet_player_action)(value)
          case "hurt_armor": return (ctx.packet_hurt_armor)(value)
          case "set_entity_data": return (ctx.packet_set_entity_data)(value)
          case "set_entity_motion": return (ctx.packet_set_entity_motion)(value)
          case "set_entity_link": return (ctx.packet_set_entity_link)(value)
          case "set_health": return (ctx.packet_set_health)(value)
          case "set_spawn_position": return (ctx.packet_set_spawn_position)(value)
          case "animate": return (ctx.packet_animate)(value)
          case "respawn": return (ctx.packet_respawn)(value)
          case "container_open": return (ctx.packet_container_open)(value)
          case "container_close": return (ctx.packet_container_close)(value)
          case "player_hotbar": return (ctx.packet_player_hotbar)(value)
          case "inventory_content": return (ctx.packet_inventory_content)(value)
          case "inventory_slot": return (ctx.packet_inventory_slot)(value)
          case "container_set_data": return (ctx.packet_container_set_data)(value)
          case "crafting_data": return (ctx.packet_crafting_data)(value)
          case "crafting_event": return (ctx.packet_crafting_event)(value)
          case "gui_data_pick_item": return (ctx.packet_gui_data_pick_item)(value)
          case "adventure_settings": return (ctx.packet_adventure_settings)(value)
          case "block_entity_data": return (ctx.packet_block_entity_data)(value)
          case "player_input": return (ctx.packet_player_input)(value)
          case "level_chunk": return (ctx.packet_level_chunk)(value)
          case "set_commands_enabled": return (ctx.packet_set_commands_enabled)(value)
          case "set_difficulty": return (ctx.packet_set_difficulty)(value)
          case "change_dimension": return (ctx.packet_change_dimension)(value)
          case "set_player_game_type": return (ctx.packet_set_player_game_type)(value)
          case "player_list": return (ctx.packet_player_list)(value)
          case "simple_event": return (ctx.packet_simple_event)(value)
          case "event": return (ctx.packet_event)(value)
          case "spawn_experience_orb": return (ctx.packet_spawn_experience_orb)(value)
          case "clientbound_map_item_data": return (ctx.packet_clientbound_map_item_data)(value)
          case "map_info_request": return (ctx.packet_map_info_request)(value)
          case "request_chunk_radius": return (ctx.packet_request_chunk_radius)(value)
          case "chunk_radius_update": return (ctx.packet_chunk_radius_update)(value)
          case "item_frame_drop_item": return (ctx.packet_item_frame_drop_item)(value)
          case "game_rules_changed": return (ctx.packet_game_rules_changed)(value)
          case "camera": return (ctx.packet_camera)(value)
          case "boss_event": return (ctx.packet_boss_event)(value)
          case "show_credits": return (ctx.packet_show_credits)(value)
          case "available_commands": return (ctx.packet_available_commands)(value)
          case "command_request": return (ctx.packet_command_request)(value)
          case "command_block_update": return (ctx.packet_command_block_update)(value)
          case "command_output": return (ctx.packet_command_output)(value)
          case "update_trade": return (ctx.packet_update_trade)(value)
          case "update_equipment": return (ctx.packet_update_equipment)(value)
          case "resource_pack_data_info": return (ctx.packet_resource_pack_data_info)(value)
          case "resource_pack_chunk_data": return (ctx.packet_resource_pack_chunk_data)(value)
          case "resource_pack_chunk_request": return (ctx.packet_resource_pack_chunk_request)(value)
          case "transfer": return (ctx.packet_transfer)(value)
          case "play_sound": return (ctx.packet_play_sound)(value)
          case "stop_sound": return (ctx.packet_stop_sound)(value)
          case "set_title": return (ctx.packet_set_title)(value)
          case "add_behavior_tree": return (ctx.packet_add_behavior_tree)(value)
          case "structure_block_update": return (ctx.packet_structure_block_update)(value)
          case "show_store_offer": return (ctx.packet_show_store_offer)(value)
          case "purchase_receipt": return (ctx.packet_purchase_receipt)(value)
          case "player_skin": return (ctx.packet_player_skin)(value)
          case "sub_client_login": return (ctx.packet_sub_client_login)(value)
          case "initiate_web_socket_connection": return (ctx.packet_initiate_web_socket_connection)(value)
          case "set_last_hurt_by": return (ctx.packet_set_last_hurt_by)(value)
          case "book_edit": return (ctx.packet_book_edit)(value)
          case "npc_request": return (ctx.packet_npc_request)(value)
          case "photo_transfer": return (ctx.packet_photo_transfer)(value)
          case "modal_form_request": return (ctx.packet_modal_form_request)(value)
          case "modal_form_response": return (ctx.packet_modal_form_response)(value)
          case "server_settings_request": return (ctx.packet_server_settings_request)(value)
          case "server_settings_response": return (ctx.packet_server_settings_response)(value)
          case "show_profile": return (ctx.packet_show_profile)(value)
          case "set_default_game_type": return (ctx.packet_set_default_game_type)(value)
          case "remove_objective": return (ctx.packet_remove_objective)(value)
          case "set_display_objective": return (ctx.packet_set_display_objective)(value)
          case "set_score": return (ctx.packet_set_score)(value)
          case "lab_table": return (ctx.packet_lab_table)(value)
          case "update_block_synced": return (ctx.packet_update_block_synced)(value)
          case "move_entity_delta": return (ctx.packet_move_entity_delta)(value)
          case "set_scoreboard_identity": return (ctx.packet_set_scoreboard_identity)(value)
          case "set_local_player_as_initialized": return (ctx.packet_set_local_player_as_initialized)(value)
          case "update_soft_enum": return (ctx.packet_update_soft_enum)(value)
          case "network_stack_latency": return (ctx.packet_network_stack_latency)(value)
          case "script_custom_event": return (ctx.packet_script_custom_event)(value)
          case "spawn_particle_effect": return (ctx.packet_spawn_particle_effect)(value)
          case "available_entity_identifiers": return (ctx.packet_available_entity_identifiers)(value)
          case "level_sound_event_v2": return (ctx.packet_level_sound_event_v2)(value)
          case "network_chunk_publisher_update": return (ctx.packet_network_chunk_publisher_update)(value)
          case "biome_definition_list": return (ctx.packet_biome_definition_list)(value)
          case "level_sound_event": return (ctx.packet_level_sound_event)(value)
          case "level_event_generic": return (ctx.packet_level_event_generic)(value)
          case "lectern_update": return (ctx.packet_lectern_update)(value)
          case "video_stream_connect": return (ctx.packet_video_stream_connect)(value)
          case "add_ecs_entity": return (ctx.packet_add_ecs_entity)(value)
          case "remove_ecs_entity": return (ctx.packet_remove_ecs_entity)(value)
          case "client_cache_status": return (ctx.packet_client_cache_status)(value)
          case "on_screen_texture_animation": return (ctx.packet_on_screen_texture_animation)(value)
          case "map_create_locked_copy": return (ctx.packet_map_create_locked_copy)(value)
          case "structure_template_data_export_request": return (ctx.packet_structure_template_data_export_request)(value)
          case "structure_template_data_export_response": return (ctx.packet_structure_template_data_export_response)(value)
          case "update_block_properties": return (ctx.packet_update_block_properties)(value)
          case "client_cache_blob_status": return (ctx.packet_client_cache_blob_status)(value)
          case "client_cache_miss_response": return (ctx.packet_client_cache_miss_response)(value)
          case "education_settings": return (ctx.packet_education_settings)(value)
          case "multiplayer_settings": return (ctx.packet_multiplayer_settings)(value)
          case "settings_command": return (ctx.packet_settings_command)(value)
          case "anvil_damage": return (ctx.packet_anvil_damage)(value)
          case "completed_using_item": return (ctx.packet_completed_using_item)(value)
          case "network_settings": return (ctx.packet_network_settings)(value)
          case "player_auth_input": return (ctx.packet_player_auth_input)(value)
          case "creative_content": return (ctx.packet_creative_content)(value)
          case "player_enchant_options": return (ctx.packet_player_enchant_options)(value)
          case "item_stack_request": return (ctx.packet_item_stack_request)(value)
          case "item_stack_response": return (ctx.packet_item_stack_response)(value)
          case "player_armor_damage": return (ctx.packet_player_armor_damage)(value)
          case "update_player_game_type": return (ctx.packet_update_player_game_type)(value)
          case "position_tracking_db_request": return (ctx.packet_position_tracking_db_request)(value)
          case "position_tracking_db_broadcast": return (ctx.packet_position_tracking_db_broadcast)(value)
          case "packet_violation_warning": return (ctx.packet_packet_violation_warning)(value)
          case "motion_prediction_hints": return (ctx.packet_motion_prediction_hints)(value)
          case "animate_entity": return (ctx.packet_animate_entity)(value)
          case "camera_shake": return (ctx.packet_camera_shake)(value)
          case "player_fog": return (ctx.packet_player_fog)(value)
          case "correct_player_move_prediction": return (ctx.packet_correct_player_move_prediction)(value)
          case "item_component": return (ctx.packet_item_component)(value)
          case "filter_text_packet": return (ctx.packet_filter_text_packet)(value)
          case "debug_renderer": return (ctx.packet_debug_renderer)(value)
          default: return (ctx.void)(value)
        }
      })(params)
      return size
    },
    packet_login: (value) => {
      let size = 0
      let protocol_version = value.protocol_version
      size += (ctx.i32)(protocol_version)
      let tokens = value.tokens
      size += ((value) => {
        const payloadSize = (ctx.LoginTokens)(value)
            return (ctx.varint)(payloadSize) + payloadSize
      })(tokens)
      return size
    },
    LoginTokens: (value) => {
      let size = 0
      let identity = value.identity
      size += (ctx.LittleString)(identity)
      let client = value.client
      size += (ctx.LittleString)(client)
      return size
    },
    packet_play_status: (value) => {
      let size = 0
      let status = value.status
      size += ((value) => {
        return (ctx.i32)({"login_success":0,"failed_client":1,"failed_spawn":2,"player_spawn":3,"failed_invalid_tenant":4,"failed_vanilla_edu":5,"failed_edu_vanilla":6,"failed_server_full":7}[value] || value)
      })(status)
      return size
    },
    packet_server_to_client_handshake: (value) => {
      let size = 0
      let token = value.token
      size += (ctx.string)(token)
      return size
    },
    packet_client_to_server_handshake: (value) => {
      let size = 0
      return size
    },
    packet_disconnect: (value) => {
      let size = 0
      let hide_disconnect_reason = value.hide_disconnect_reason
      size += (ctx.bool)(hide_disconnect_reason)
      let message = value.message
      size += (ctx.string)(message)
      return size
    },
    packet_resource_packs_info: (value) => {
      let size = 0
      let must_accept = value.must_accept
      size += (ctx.bool)(must_accept)
      let has_scripts = value.has_scripts
      size += (ctx.bool)(has_scripts)
      let behaviour_packs = value.behaviour_packs
      size += (ctx.BehaviourPackInfos)(behaviour_packs)
      let texture_packs = value.texture_packs
      size += (ctx.TexturePackInfos)(texture_packs)
      return size
    },
    packet_resource_pack_stack: (value) => {
      let size = 0
      let must_accept = value.must_accept
      size += (ctx.bool)(must_accept)
      let behavior_packs = value.behavior_packs
      size += (ctx.ResourcePackIdVersions)(behavior_packs)
      let resource_packs = value.resource_packs
      size += (ctx.ResourcePackIdVersions)(resource_packs)
      let game_version = value.game_version
      size += (ctx.string)(game_version)
      let experiments = value.experiments
      size += (ctx.Experiments)(experiments)
      let experiments_previously_used = value.experiments_previously_used
      size += (ctx.bool)(experiments_previously_used)
      return size
    },
    packet_resource_pack_client_response: (value) => {
      let size = 0
      let response_status = value.response_status
      size += ((value) => {
        return (ctx.u8)({"none":0,"refused":1,"send_packs":2,"have_all_packs":3,"completed":4}[value] || value)
      })(response_status)
      let resourcepackids = value.resourcepackids
      size += (ctx.ResourcePackIds)(resourcepackids)
      return size
    },
    packet_text: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.u8)({"raw":0,"chat":1,"translation":2,"popup":3,"jukebox_popup":4,"tip":5,"system":6,"whisper":7,"announcement":8,"json_whisper":9,"json":10}[value] || value)
      })(type)
      let needs_translation = value.needs_translation
      size += (ctx.bool)(needs_translation)
      let source_name = value.source_name
      size += ((value) => {
        switch (type) {
          case "chat": return (ctx.string)(value)
          case "whisper": return (ctx.string)(value)
          case "announcement": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(source_name)
      let message = value.message
      size += ((value) => {
        switch (type) {
          case "chat": return (ctx.string)(value)
          case "whisper": return (ctx.string)(value)
          case "announcement": return (ctx.string)(value)
          case "raw": return (ctx.string)(value)
          case "tip": return (ctx.string)(value)
          case "system": return (ctx.string)(value)
          case "json_whisper": return (ctx.string)(value)
          case "json": return (ctx.string)(value)
          case "translation": return (ctx.string)(value)
          case "popup": return (ctx.string)(value)
          case "jukebox_popup": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(message)
      let paramaters = value.paramaters
      size += ((value) => {
        switch (type) {
          case "translation": return ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(value)
          case "popup": return ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(value)
          case "jukebox_popup": return ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(paramaters)
      let xuid = value.xuid
      size += (ctx.string)(xuid)
      let platform_chat_id = value.platform_chat_id
      size += (ctx.string)(platform_chat_id)
      return size
    },
    packet_set_time: (value) => {
      let size = 0
      let time = value.time
      size += (ctx.zigzag32)(time)
      return size
    },
    packet_start_game: (value) => {
      let size = 0
      let entity_id = value.entity_id
      size += (ctx.zigzag64)(entity_id)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let player_gamemode = value.player_gamemode
      size += (ctx.GameMode)(player_gamemode)
      let player_position = value.player_position
      size += (ctx.vec3f)(player_position)
      let rotation = value.rotation
      size += (ctx.vec2f)(rotation)
      let seed = value.seed
      size += (ctx.zigzag32)(seed)
      let biome_type = value.biome_type
      size += (ctx.li16)(biome_type)
      let biome_name = value.biome_name
      size += (ctx.string)(biome_name)
      let dimension = value.dimension
      size += (ctx.zigzag32)(dimension)
      let generator = value.generator
      size += (ctx.zigzag32)(generator)
      let world_gamemode = value.world_gamemode
      size += (ctx.GameMode)(world_gamemode)
      let difficulty = value.difficulty
      size += (ctx.zigzag32)(difficulty)
      let spawn_position = value.spawn_position
      size += (ctx.BlockCoordinates)(spawn_position)
      let achievements_disabled = value.achievements_disabled
      size += (ctx.bool)(achievements_disabled)
      let day_cycle_stop_time = value.day_cycle_stop_time
      size += (ctx.zigzag32)(day_cycle_stop_time)
      let edu_offer = value.edu_offer
      size += (ctx.zigzag32)(edu_offer)
      let edu_features_enabled = value.edu_features_enabled
      size += (ctx.bool)(edu_features_enabled)
      let edu_product_uuid = value.edu_product_uuid
      size += (ctx.string)(edu_product_uuid)
      let rain_level = value.rain_level
      size += (ctx.lf32)(rain_level)
      let lightning_level = value.lightning_level
      size += (ctx.lf32)(lightning_level)
      let has_confirmed_platform_locked_content = value.has_confirmed_platform_locked_content
      size += (ctx.bool)(has_confirmed_platform_locked_content)
      let is_multiplayer = value.is_multiplayer
      size += (ctx.bool)(is_multiplayer)
      let broadcast_to_lan = value.broadcast_to_lan
      size += (ctx.bool)(broadcast_to_lan)
      let xbox_live_broadcast_mode = value.xbox_live_broadcast_mode
      size += (ctx.varint)(xbox_live_broadcast_mode)
      let platform_broadcast_mode = value.platform_broadcast_mode
      size += (ctx.varint)(platform_broadcast_mode)
      let enable_commands = value.enable_commands
      size += (ctx.bool)(enable_commands)
      let is_texturepacks_required = value.is_texturepacks_required
      size += (ctx.bool)(is_texturepacks_required)
      let gamerules = value.gamerules
      size += (ctx.GameRules)(gamerules)
      let experiments = value.experiments
      size += (ctx.Experiments)(experiments)
      let experiments_previously_used = value.experiments_previously_used
      size += (ctx.bool)(experiments_previously_used)
      let bonus_chest = value.bonus_chest
      size += (ctx.bool)(bonus_chest)
      let map_enabled = value.map_enabled
      size += (ctx.bool)(map_enabled)
      let permission_level = value.permission_level
      size += (ctx.zigzag32)(permission_level)
      let server_chunk_tick_range = value.server_chunk_tick_range
      size += (ctx.li32)(server_chunk_tick_range)
      let has_locked_behavior_pack = value.has_locked_behavior_pack
      size += (ctx.bool)(has_locked_behavior_pack)
      let has_locked_resource_pack = value.has_locked_resource_pack
      size += (ctx.bool)(has_locked_resource_pack)
      let is_from_locked_world_template = value.is_from_locked_world_template
      size += (ctx.bool)(is_from_locked_world_template)
      let msa_gamertags_only = value.msa_gamertags_only
      size += (ctx.bool)(msa_gamertags_only)
      let is_from_world_template = value.is_from_world_template
      size += (ctx.bool)(is_from_world_template)
      let is_world_template_option_locked = value.is_world_template_option_locked
      size += (ctx.bool)(is_world_template_option_locked)
      let only_spawn_v1_villagers = value.only_spawn_v1_villagers
      size += (ctx.bool)(only_spawn_v1_villagers)
      let game_version = value.game_version
      size += (ctx.string)(game_version)
      let limited_world_width = value.limited_world_width
      size += (ctx.li32)(limited_world_width)
      let limited_world_length = value.limited_world_length
      size += (ctx.li32)(limited_world_length)
      let is_new_nether = value.is_new_nether
      size += (ctx.bool)(is_new_nether)
      let experimental_gameplay_override = value.experimental_gameplay_override
      size += (ctx.bool)(experimental_gameplay_override)
      let level_id = value.level_id
      size += (ctx.string)(level_id)
      let world_name = value.world_name
      size += (ctx.string)(world_name)
      let premium_world_template_id = value.premium_world_template_id
      size += (ctx.string)(premium_world_template_id)
      let is_trial = value.is_trial
      size += (ctx.bool)(is_trial)
      let movement_authority = value.movement_authority
      size += ((value) => {
        return (ctx.zigzag32)({"client":0,"server":1,"server_with_rewind":2}[value] || value)
      })(movement_authority)
      let rewind_history_size = value.rewind_history_size
      size += (ctx.zigzag32)(rewind_history_size)
      let server_authoritative_block_breaking = value.server_authoritative_block_breaking
      size += (ctx.bool)(server_authoritative_block_breaking)
      let current_tick = value.current_tick
      size += (ctx.li64)(current_tick)
      let enchantment_seed = value.enchantment_seed
      size += (ctx.zigzag32)(enchantment_seed)
      let block_properties = value.block_properties
      size += (ctx.BlockProperties)(block_properties)
      let itemstates = value.itemstates
      size += (ctx.Itemstates)(itemstates)
      let multiplayer_correlation_id = value.multiplayer_correlation_id
      size += (ctx.string)(multiplayer_correlation_id)
      let server_authoritative_inventory = value.server_authoritative_inventory
      size += (ctx.bool)(server_authoritative_inventory)
      return size
    },
    packet_add_player: (value) => {
      let size = 0
      let uuid = value.uuid
      size += (ctx.uuid)(uuid)
      let username = value.username
      size += (ctx.string)(username)
      let entity_id_self = value.entity_id_self
      size += (ctx.zigzag64)(entity_id_self)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let platform_chat_id = value.platform_chat_id
      size += (ctx.string)(platform_chat_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let velocity = value.velocity
      size += (ctx.vec3f)(velocity)
      let pitch = value.pitch
      size += (ctx.lf32)(pitch)
      let yaw = value.yaw
      size += (ctx.lf32)(yaw)
      let head_yaw = value.head_yaw
      size += (ctx.lf32)(head_yaw)
      let held_item = value.held_item
      size += (ctx.Item)(held_item)
      let metadata = value.metadata
      size += (ctx.MetadataDictionary)(metadata)
      let flags = value.flags
      size += (ctx.varint)(flags)
      let command_permission = value.command_permission
      size += (ctx.varint)(command_permission)
      let action_permissions = value.action_permissions
      size += (ctx.varint)(action_permissions)
      let permission_level = value.permission_level
      size += (ctx.varint)(permission_level)
      let custom_stored_permissions = value.custom_stored_permissions
      size += (ctx.varint)(custom_stored_permissions)
      let user_id = value.user_id
      size += (ctx.li64)(user_id)
      let links = value.links
      size += (ctx.Links)(links)
      let device_id = value.device_id
      size += (ctx.string)(device_id)
      let device_os = value.device_os
      size += (ctx.li32)(device_os)
      return size
    },
    packet_add_entity: (value) => {
      let size = 0
      let entity_id_self = value.entity_id_self
      size += (ctx.zigzag64)(entity_id_self)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let entity_type = value.entity_type
      size += (ctx.string)(entity_type)
      let position = value.position
      size += (ctx.vec3f)(position)
      let velocity = value.velocity
      size += (ctx.vec3f)(velocity)
      let pitch = value.pitch
      size += (ctx.lf32)(pitch)
      let yaw = value.yaw
      size += (ctx.lf32)(yaw)
      let head_yaw = value.head_yaw
      size += (ctx.lf32)(head_yaw)
      let attributes = value.attributes
      size += (ctx.EntityAttributes)(attributes)
      let metadata = value.metadata
      size += (ctx.MetadataDictionary)(metadata)
      let links = value.links
      size += (ctx.Links)(links)
      return size
    },
    packet_remove_entity: (value) => {
      let size = 0
      let entity_id_self = value.entity_id_self
      size += (ctx.zigzag64)(entity_id_self)
      return size
    },
    packet_add_item_entity: (value) => {
      let size = 0
      let entity_id_self = value.entity_id_self
      size += (ctx.zigzag64)(entity_id_self)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let item = value.item
      size += (ctx.Item)(item)
      let position = value.position
      size += (ctx.vec3f)(position)
      let velocity = value.velocity
      size += (ctx.vec3f)(velocity)
      let metadata = value.metadata
      size += (ctx.MetadataDictionary)(metadata)
      let is_from_fishing = value.is_from_fishing
      size += (ctx.bool)(is_from_fishing)
      return size
    },
    packet_take_item_entity: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let target = value.target
      size += (ctx.varint)(target)
      return size
    },
    packet_move_entity: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let flags = value.flags
      size += (ctx.u8)(flags)
      let position = value.position
      size += (ctx.vec3f)(position)
      let rotation = value.rotation
      size += (ctx.Rotation)(rotation)
      return size
    },
    packet_move_player: (value) => {
      let size = 0
      let runtime_id = value.runtime_id
      size += (ctx.varint)(runtime_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let pitch = value.pitch
      size += (ctx.lf32)(pitch)
      let yaw = value.yaw
      size += (ctx.lf32)(yaw)
      let head_yaw = value.head_yaw
      size += (ctx.lf32)(head_yaw)
      let mode = value.mode
      size += ((value) => {
        return (ctx.u8)({"normal":0,"reset":1,"teleport":2,"rotation":3}[value] || value)
      })(mode)
      let on_ground = value.on_ground
      size += (ctx.bool)(on_ground)
      let ridden_runtime_id = value.ridden_runtime_id
      size += (ctx.varint)(ridden_runtime_id)
      let teleport = value.teleport
      size += ((value) => {
        switch (mode) {
          case "teleport": return ((value) => {
            let size = 0
            let cause = value.cause
            size += ((value) => {
              return (ctx.li32)({"unknown":0,"projectile":1,"chorus_fruit":2,"command":3,"behavior":4}[value] || value)
            })(cause)
            let source_entity_type = value.source_entity_type
            size += (ctx.LegacyEntityType)(source_entity_type)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(teleport)
      let tick = value.tick
      size += (ctx.varint64)(tick)
      return size
    },
    packet_rider_jump: (value) => {
      let size = 0
      let jump_strength = value.jump_strength
      size += (ctx.zigzag32)(jump_strength)
      return size
    },
    packet_update_block: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let block_runtime_id = value.block_runtime_id
      size += (ctx.varint)(block_runtime_id)
      let flags = value.flags
      size += (ctx.UpdateBlockFlags)(flags)
      let layer = value.layer
      size += (ctx.varint)(layer)
      return size
    },
    packet_add_painting: (value) => {
      let size = 0
      let entity_id_self = value.entity_id_self
      size += (ctx.zigzag64)(entity_id_self)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let coordinates = value.coordinates
      size += (ctx.vec3f)(coordinates)
      let direction = value.direction
      size += (ctx.zigzag32)(direction)
      let title = value.title
      size += (ctx.string)(title)
      return size
    },
    packet_tick_sync: (value) => {
      let size = 0
      let request_time = value.request_time
      size += (ctx.li64)(request_time)
      let response_time = value.response_time
      size += (ctx.li64)(response_time)
      return size
    },
    packet_level_sound_event_old: (value) => {
      let size = 0
      let sound_id = value.sound_id
      size += (ctx.u8)(sound_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let block_id = value.block_id
      size += (ctx.zigzag32)(block_id)
      let entity_type = value.entity_type
      size += (ctx.zigzag32)(entity_type)
      let is_baby_mob = value.is_baby_mob
      size += (ctx.bool)(is_baby_mob)
      let is_global = value.is_global
      size += (ctx.bool)(is_global)
      return size
    },
    packet_level_event: (value) => {
      let size = 0
      let event = value.event
      size += ((value) => {
        return (ctx.zigzag32)({"sound_click":1000,"sound_click_fail":1001,"sound_shoot":1002,"sound_door":1003,"sound_fizz":1004,"sound_ignite":1005,"sound_ghast":1007,"sound_ghast_shoot":1008,"sound_blaze_shoot":1009,"sound_door_bump":1010,"sound_door_crash":1012,"sound_enderman_teleport":1018,"sound_anvil_break":1020,"sound_anvil_use":1021,"sound_anvil_fall":1022,"sound_pop":1030,"sound_portal":1032,"sound_itemframe_add_item":1040,"sound_itemframe_remove":1041,"sound_itemframe_place":1042,"sound_itemframe_remove_item":1043,"sound_itemframe_rotate_item":1044,"sound_camera":1050,"sound_orb":1051,"sound_totem":1052,"sound_armor_stand_break":1060,"sound_armor_stand_hit":1061,"sound_armor_stand_fall":1062,"sound_armor_stand_place":1063,"pointed_dripstone_land":1064,"dye_used":1065,"ink_sack_used":1066,"particle_shoot":2000,"particle_destroy":2001,"particle_splash":2002,"particle_eye_despawn":2003,"particle_spawn":2004,"particle_crop_growth":2005,"particle_guardian_curse":2006,"particle_death_smoke":2007,"particle_block_force_field":2008,"particle_projectile_hit":2009,"particle_dragon_egg_teleport":2010,"particle_crop_eaten":2011,"particle_critical":2012,"particle_enderman_teleport":2013,"particle_punch_block":2014,"particle_bubble":2015,"particle_evaporate":2016,"particle_destroy_armor_stand":2017,"particle_breaking_egg":2018,"particle_destroy_egg":2019,"particle_evaporate_water":2020,"particle_destroy_block_no_sound":2021,"particle_knockback_roar":2022,"particle_teleport_trail":2023,"particle_point_cloud":2024,"particle_explosion":2025,"particle_block_explosion":2026,"particle_vibration_signal":2027,"particle_dripstone_drip":2028,"particle_fizz_effect":2029,"particle_wax_on":2030,"particle_wax_off":2031,"particle_scrape":2032,"particle_electric_spark":2033,"start_rain":3001,"start_thunder":3002,"stop_rain":3003,"stop_thunder":3004,"pause_game":3005,"pause_game_no_screen":3006,"set_game_speed":3007,"redstone_trigger":3500,"cauldron_explode":3501,"cauldron_dye_armor":3502,"cauldron_clean_armor":3503,"cauldron_fill_potion":3504,"cauldron_take_potion":3505,"cauldron_fill_water":3506,"cauldron_take_water":3507,"cauldron_add_dye":3508,"cauldron_clean_banner":3509,"block_start_break":3600,"block_stop_break":3601,"set_data":4000,"players_sleeping":9800,"add_particle_mask":16384}[value] || value)
      })(event)
      let position = value.position
      size += (ctx.vec3f)(position)
      let data = value.data
      size += (ctx.zigzag32)(data)
      return size
    },
    packet_block_event: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let type = value.type
      size += ((value) => {
        return (ctx.zigzag32)({"sound":0,"change_state":1}[value] || value)
      })(type)
      let data = value.data
      size += (ctx.zigzag32)(data)
      return size
    },
    packet_entity_event: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let event_id = value.event_id
      size += ((value) => {
        return (ctx.u8)({"jump":1,"hurt_animation":2,"death_animation":3,"arm_swing":4,"stop_attack":5,"tame_fail":6,"tame_success":7,"shake_wet":8,"use_item":9,"eat_grass_animation":10,"fish_hook_bubble":11,"fish_hook_position":12,"fish_hook_hook":13,"fish_hook_tease":14,"squid_ink_cloud":15,"zombie_villager_cure":16,"respawn":18,"iron_golem_offer_flower":19,"iron_golem_withdraw_flower":20,"love_particles":21,"villager_angry":22,"villager_happy":23,"witch_spell_particles":24,"firework_particles":25,"in_love_particles":26,"silverfish_spawn_animation":27,"guardian_attack":28,"witch_drink_potion":29,"witch_throw_potion":30,"minecart_tnt_prime_fuse":31,"creeper_prime_fuse":32,"air_supply_expired":33,"player_add_xp_levels":34,"elder_guardian_curse":35,"agent_arm_swing":36,"ender_dragon_death":37,"dust_particles":38,"arrow_shake":39,"eating_item":57,"baby_animal_feed":60,"death_smoke_cloud":61,"complete_trade":62,"remove_leash":63,"consume_totem":65,"player_check_treasure_hunter_achievement":66,"entity_spawn":67,"dragon_puke":68,"item_entity_merge":69,"start_swim":70,"balloon_pop":71,"treasure_hunt":72,"agent_summon":73,"charged_crossbow":74,"fall":75}[value] || value)
      })(event_id)
      let data = value.data
      size += (ctx.zigzag32)(data)
      return size
    },
    packet_mob_effect: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let event_id = value.event_id
      size += (ctx.u8)(event_id)
      let effect_id = value.effect_id
      size += (ctx.zigzag32)(effect_id)
      let amplifier = value.amplifier
      size += (ctx.zigzag32)(amplifier)
      let particles = value.particles
      size += (ctx.bool)(particles)
      let duration = value.duration
      size += (ctx.zigzag32)(duration)
      return size
    },
    packet_update_attributes: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let attributes = value.attributes
      size += (ctx.PlayerAttributes)(attributes)
      let tick = value.tick
      size += (ctx.varint64)(tick)
      return size
    },
    packet_inventory_transaction: (value) => {
      let size = 0
      let transaction = value.transaction
      size += (ctx.Transaction)(transaction)
      return size
    },
    packet_mob_equipment: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let item = value.item
      size += (ctx.Item)(item)
      let slot = value.slot
      size += (ctx.u8)(slot)
      let selected_slot = value.selected_slot
      size += (ctx.u8)(selected_slot)
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      return size
    },
    packet_mob_armor_equipment: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let helmet = value.helmet
      size += (ctx.Item)(helmet)
      let chestplate = value.chestplate
      size += (ctx.Item)(chestplate)
      let leggings = value.leggings
      size += (ctx.Item)(leggings)
      let boots = value.boots
      size += (ctx.Item)(boots)
      return size
    },
    packet_interact: (value) => {
      let size = 0
      let action_id = value.action_id
      size += ((value) => {
        return (ctx.u8)({"leave_vehicle":3,"mouse_over_entity":4,"open_inventory":6}[value] || value)
      })(action_id)
      let target_entity_id = value.target_entity_id
      size += (ctx.varint64)(target_entity_id)
      let position = value.position
      size += ((value) => {
        switch (action_id) {
          case "mouse_over_entity": return (ctx.vec3f)(value)
          case "leave_vehicle": return (ctx.vec3f)(value)
          default: return (ctx.void)(value)
        }
      })(position)
      return size
    },
    packet_block_pick_request: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.zigzag32)(x)
      let y = value.y
      size += (ctx.zigzag32)(y)
      let z = value.z
      size += (ctx.zigzag32)(z)
      let add_user_data = value.add_user_data
      size += (ctx.bool)(add_user_data)
      let selected_slot = value.selected_slot
      size += (ctx.u8)(selected_slot)
      return size
    },
    packet_entity_pick_request: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.lu64)(runtime_entity_id)
      let selected_slot = value.selected_slot
      size += (ctx.u8)(selected_slot)
      return size
    },
    packet_player_action: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let action = value.action
      size += (ctx.Action)(action)
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let face = value.face
      size += (ctx.zigzag32)(face)
      return size
    },
    packet_hurt_armor: (value) => {
      let size = 0
      let health = value.health
      size += (ctx.zigzag32)(health)
      return size
    },
    packet_set_entity_data: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let metadata = value.metadata
      size += (ctx.MetadataDictionary)(metadata)
      let tick = value.tick
      size += (ctx.varint)(tick)
      return size
    },
    packet_set_entity_motion: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let velocity = value.velocity
      size += (ctx.vec3f)(velocity)
      return size
    },
    packet_set_entity_link: (value) => {
      let size = 0
      let link = value.link
      size += (ctx.Link)(link)
      return size
    },
    packet_set_health: (value) => {
      let size = 0
      let health = value.health
      size += (ctx.zigzag32)(health)
      return size
    },
    packet_set_spawn_position: (value) => {
      let size = 0
      let spawn_type = value.spawn_type
      size += ((value) => {
        return (ctx.zigzag32)({"player":0,"world":1}[value] || value)
      })(spawn_type)
      let player_position = value.player_position
      size += (ctx.BlockCoordinates)(player_position)
      let dimension = value.dimension
      size += (ctx.zigzag32)(dimension)
      let world_position = value.world_position
      size += (ctx.BlockCoordinates)(world_position)
      return size
    },
    packet_animate: (value) => {
      let size = 0
      let action_id = value.action_id
      size += ((value) => {
        return (ctx.zigzag32)({"none":0,"swing_arm":1,"unknown":2,"wake_up":3,"critical_hit":4,"magic_critical_hit":5,"row_right":6,"row_left":7}[value] || value)
      })(action_id)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      return size
    },
    packet_respawn: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.vec3f)(position)
      let state = value.state
      size += (ctx.u8)(state)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      return size
    },
    packet_container_open: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let window_type = value.window_type
      size += (ctx.WindowType)(window_type)
      let coordinates = value.coordinates
      size += (ctx.BlockCoordinates)(coordinates)
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.zigzag64)(runtime_entity_id)
      return size
    },
    packet_container_close: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let server = value.server
      size += (ctx.bool)(server)
      return size
    },
    packet_player_hotbar: (value) => {
      let size = 0
      let selected_slot = value.selected_slot
      size += (ctx.varint)(selected_slot)
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let select_slot = value.select_slot
      size += (ctx.bool)(select_slot)
      return size
    },
    packet_inventory_content: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowIDVarint)(window_id)
      let input = value.input
      size += (ctx.ItemStacks)(input)
      return size
    },
    packet_inventory_slot: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowIDVarint)(window_id)
      let slot = value.slot
      size += (ctx.varint)(slot)
      let item = value.item
      size += (ctx.Item)(item)
      return size
    },
    packet_container_set_data: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let property = value.property
      size += (ctx.zigzag32)(property)
      let value1 = value.value
      size += (ctx.zigzag32)(value1)
      return size
    },
    packet_crafting_data: (value) => {
      let size = 0
      let recipes = value.recipes
      size += (ctx.Recipes)(recipes)
      let potion_type_recipes = value.potion_type_recipes
      size += (ctx.PotionTypeRecipes)(potion_type_recipes)
      let potion_container_recipes = value.potion_container_recipes
      size += (ctx.PotionContainerChangeRecipes)(potion_container_recipes)
      let is_clean = value.is_clean
      size += (ctx.bool)(is_clean)
      return size
    },
    packet_crafting_event: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let recipe_type = value.recipe_type
      size += ((value) => {
        return (ctx.zigzag32)({"inventory":0,"crafting":1,"workbench":2}[value] || value)
      })(recipe_type)
      let recipe_id = value.recipe_id
      size += (ctx.uuid)(recipe_id)
      let input = value.input
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Item)(value[i])
        }
        return size
      })(input)
      let result = value.result
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Item)(value[i])
        }
        return size
      })(result)
      return size
    },
    packet_gui_data_pick_item: (value) => {
      let size = 0
      let item_name = value.item_name
      size += (ctx.string)(item_name)
      let item_effects = value.item_effects
      size += (ctx.string)(item_effects)
      let hotbar_slot = value.hotbar_slot
      size += (ctx.li32)(hotbar_slot)
      return size
    },
    packet_adventure_settings: (value) => {
      let size = 0
      let flags = value.flags
      size += (ctx.AdventureFlags)(flags)
      let command_permission = value.command_permission
      size += ((value) => {
        return (ctx.varint32)({"normal":0,"operator":1,"host":2,"automation":3,"admin":4}[value] || value)
      })(command_permission)
      let action_permissions = value.action_permissions
      size += (ctx.ActionPermissions)(action_permissions)
      let permission_level = value.permission_level
      size += ((value) => {
        return (ctx.varint)({"visitor":0,"member":1,"operator":2,"custom":3}[value] || value)
      })(permission_level)
      let custom_stored_permissions = value.custom_stored_permissions
      size += (ctx.varint)(custom_stored_permissions)
      let user_id = value.user_id
      size += (ctx.li64)(user_id)
      return size
    },
    packet_block_entity_data: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let nbt = value.nbt
      size += (ctx.nbt)(nbt)
      return size
    },
    packet_player_input: (value) => {
      let size = 0
      let motion_x = value.motion_x
      size += (ctx.lf32)(motion_x)
      let motion_z = value.motion_z
      size += (ctx.lf32)(motion_z)
      let jumping = value.jumping
      size += (ctx.bool)(jumping)
      let sneaking = value.sneaking
      size += (ctx.bool)(sneaking)
      return size
    },
    packet_level_chunk: (value) => {
      let size = 0
      let x = value.x
      size += (ctx.zigzag32)(x)
      let z = value.z
      size += (ctx.zigzag32)(z)
      let sub_chunk_count = value.sub_chunk_count
      size += (ctx.varint)(sub_chunk_count)
      let cache_enabled = value.cache_enabled
      size += (ctx.bool)(cache_enabled)
      let blobs = value.blobs
      size += ((value) => {
        switch (cache_enabled) {
          case true: return ((value) => {
            let size = 0
            let hashes = value.hashes
            size += ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += (ctx.lu64)(value[i])
              }
              return size
            })(hashes)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(blobs)
      let payload = value.payload
      size += (ctx.ByteArray)(payload)
      return size
    },
    packet_set_commands_enabled: (value) => {
      let size = 0
      let enabled = value.enabled
      size += (ctx.bool)(enabled)
      return size
    },
    packet_set_difficulty: (value) => {
      let size = 0
      let difficulty = value.difficulty
      size += (ctx.varint)(difficulty)
      return size
    },
    packet_change_dimension: (value) => {
      let size = 0
      let dimension = value.dimension
      size += (ctx.zigzag32)(dimension)
      let position = value.position
      size += (ctx.vec3f)(position)
      let respawn = value.respawn
      size += (ctx.bool)(respawn)
      return size
    },
    packet_set_player_game_type: (value) => {
      let size = 0
      let gamemode = value.gamemode
      size += (ctx.GameMode)(gamemode)
      return size
    },
    packet_player_list: (value) => {
      let size = 0
      let records = value.records
      size += (ctx.PlayerRecords)(records)
      return size
    },
    packet_simple_event: (value) => {
      let size = 0
      let event_type = value.event_type
      size += (ctx.lu16)(event_type)
      return size
    },
    packet_event: (value) => {
      let size = 0
      let runtime_id = value.runtime_id
      size += (ctx.varint64)(runtime_id)
      let event_type = value.event_type
      size += ((value) => {
        return (ctx.zigzag32)({"achievement_awarded":0,"entity_interact":1,"portal_built":2,"portal_used":3,"mob_killed":4,"cauldron_used":5,"player_death":6,"boss_killed":7,"agent_command":8,"agent_created":9,"banner_pattern_removed":10,"commaned_executed":11,"fish_bucketed":12,"mob_born":13,"pet_died":14,"cauldron_block_used":15,"composter_block_used":16,"bell_block_used":17,"actor_definition":18,"raid_update":19,"player_movement_anomaly":20,"player_moement_corrected":21,"honey_harvested":22,"target_block_hit":23,"piglin_barter":24}[value] || value)
      })(event_type)
      let use_player_id = value.use_player_id
      size += (ctx.u8)(use_player_id)
      let event_data = value.event_data
      size += (ctx.restBuffer)(event_data)
      return size
    },
    packet_spawn_experience_orb: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.vec3f)(position)
      let count = value.count
      size += (ctx.zigzag32)(count)
      return size
    },
    packet_clientbound_map_item_data: (value) => {
      let size = 0
      let map_id = value.map_id
      size += (ctx.zigzag64)(map_id)
      let update_flags = value.update_flags
      size += (ctx.UpdateMapFlags)(update_flags)
      let dimension = value.dimension
      size += (ctx.u8)(dimension)
      let locked = value.locked
      size += (ctx.bool)(locked)
      let included_in = value.included_in
      size += ((value) => {
        switch (update_flags.initialisation) {
          case true: return ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.zigzag64)(value[i])
            }
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(included_in)
      let scale = value.scale
      size += ((value) => {
        switch (update_flags.initialisation || update_flags.decoration || update_flags.texture) {
          case true: return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(scale)
      let tracked = value.tracked
      size += ((value) => {
        switch (update_flags.decoration) {
          case true: return ((value) => {
            let size = 0
            let objects = value.objects
            size += ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += (ctx.TrackedObject)(value[i])
              }
              return size
            })(objects)
            let decorations = value.decorations
            size += ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += (ctx.MapDecoration)(value[i])
              }
              return size
            })(decorations)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(tracked)
      let texture = value.texture
      size += ((value) => {
        switch (update_flags.texture) {
          case true: return ((value) => {
            let size = 0
            let width1 = value.width
            size += (ctx.zigzag32)(width1)
            let height1 = value.height
            size += (ctx.zigzag32)(height1)
            let x_offset = value.x_offset
            size += (ctx.zigzag32)(x_offset)
            let y_offset = value.y_offset
            size += (ctx.zigzag32)(y_offset)
            let pixels = value.pixels
            size += ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += (ctx.varint)(value[i])
              }
              return size
            })(pixels)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(texture)
      return size
    },
    packet_map_info_request: (value) => {
      let size = 0
      let map_id = value.map_id
      size += (ctx.zigzag64)(map_id)
      return size
    },
    packet_request_chunk_radius: (value) => {
      let size = 0
      let chunk_radius = value.chunk_radius
      size += (ctx.zigzag32)(chunk_radius)
      return size
    },
    packet_chunk_radius_update: (value) => {
      let size = 0
      let chunk_radius = value.chunk_radius
      size += (ctx.zigzag32)(chunk_radius)
      return size
    },
    packet_item_frame_drop_item: (value) => {
      let size = 0
      let coordinates = value.coordinates
      size += (ctx.BlockCoordinates)(coordinates)
      return size
    },
    packet_game_rules_changed: (value) => {
      let size = 0
      let rules = value.rules
      size += (ctx.GameRules)(rules)
      return size
    },
    packet_camera: (value) => {
      let size = 0
      let camera_entity_unique_id = value.camera_entity_unique_id
      size += (ctx.zigzag64)(camera_entity_unique_id)
      let target_player_unique_id = value.target_player_unique_id
      size += (ctx.zigzag64)(target_player_unique_id)
      return size
    },
    packet_boss_event: (value) => {
      let size = 0
      let boss_entity_id = value.boss_entity_id
      size += (ctx.zigzag64)(boss_entity_id)
      let type = value.type
      size += ((value) => {
        return (ctx.varint)({"show_bar":0,"register_player":1,"hide_bar":2,"unregister_player":3,"set_bar_progress":4,"set_bar_title":5,"update_properties":6,"texture":7}[value] || value)
      })(type)
      let title = value.title
      size += ((value) => {
        switch (type) {
          case "show_bar": return (ctx.string)(value)
          case "set_bar_title": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(title)
      let progress = value.progress
      size += ((value) => {
        switch (type) {
          case "show_bar": return (ctx.lf32)(value)
          case "set_bar_progress": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(progress)
      let screen_darkening = value.screen_darkening
      size += ((value) => {
        switch (type) {
          case "show_bar": return (ctx.li16)(value)
          case "update_properties": return (ctx.li16)(value)
          default: return (ctx.void)(value)
        }
      })(screen_darkening)
      let color = value.color
      size += ((value) => {
        switch (type) {
          case "show_bar": return (ctx.varint)(value)
          case "update_properties": return (ctx.varint)(value)
          case "texture": return (ctx.varint)(value)
          default: return (ctx.void)(value)
        }
      })(color)
      let overlay = value.overlay
      size += ((value) => {
        switch (type) {
          case "show_bar": return (ctx.varint)(value)
          case "update_properties": return (ctx.varint)(value)
          case "texture": return (ctx.varint)(value)
          default: return (ctx.void)(value)
        }
      })(overlay)
      let player_id = value.player_id
      size += ((value) => {
        switch (type) {
          case "register_player": return (ctx.zigzag64)(value)
          case "unregister_player": return (ctx.zigzag64)(value)
          default: return (ctx.void)(value)
        }
      })(player_id)
      return size
    },
    packet_show_credits: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let status = value.status
      size += (ctx.zigzag32)(status)
      return size
    },
    packet_available_commands: (value) => {
      let size = 0
      let values_len = value.values_len
      size += (ctx.varint)(values_len)
      let _enum_type = value._enum_type
      size += (() => {
          if (value.values_len <= 0xff) _enum_type = 'byte'
          else if (value.values_len <= 0xffff) _enum_type = 'short'
          else if (value.values_len <= 0xffffff) _enum_type = 'int'
          return 0
        })();(()=>{})(_enum_type)
      let enum_values = value.enum_values
      size += ((value) => {
        let size = 0
        for (let i = 0; i < value.length; i++) {
          size += (ctx.string)(value[i])
        }
        return size
      })(enum_values)
      let suffixes = value.suffixes
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.string)(value[i])
        }
        return size
      })(suffixes)
      let enums = value.enums
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let name1 = value.name
          size += (ctx.string)(name1)
          let values = value.values
          size += ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += ((value) => {
              switch (_enum_type) {
                case "byte": return (ctx.u8)(value)
                case "short": return (ctx.lu16)(value)
                case "int": return (ctx.lu32)(value)
                default: return (ctx.void)(value)
              }
            })(value[i])
            }
            return size
          })(values)
          return size
        })(value[i])
        }
        return size
      })(enums)
      let command_data = value.command_data
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let name1 = value.name
          size += (ctx.string)(name1)
          let description = value.description
          size += (ctx.string)(description)
          let flags1 = value.flags
          size += (ctx.u8)(flags1)
          let permission_level1 = value.permission_level
          size += (ctx.u8)(permission_level1)
          let alias = value.alias
          size += (ctx.li32)(alias)
          let overloads = value.overloads
          size += ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += ((value) => {
              let size = (ctx.varint)(value.length)
              for (let i = 0; i < value.length; i++) {
                size += ((value) => {
                let size = 0
                let paramater_name = value.paramater_name
                size += (ctx.string)(paramater_name)
                let value_type = value.value_type
                size += ((value) => {
                  return (ctx.lu16)({"int":1,"float":2,"value":3,"wildcard_int":4,"operator":5,"target":6,"file_path":16,"string":32,"position":40,"message":44,"raw_text":46,"json":50,"command":63}[value] || value)
                })(value_type)
                let enum_type = value.enum_type
                size += ((value) => {
                  return (ctx.lu16)({"valid":16,"enum":32,"suffixed":256,"soft_enum":1024}[value] || value)
                })(enum_type)
                let optional = value.optional
                size += (ctx.bool)(optional)
                let options = value.options
                size += (ctx.CommandFlags)(options)
                return size
              })(value[i])
              }
              return size
            })(value[i])
            }
            return size
          })(overloads)
          return size
        })(value[i])
        }
        return size
      })(command_data)
      let dynamic_enums = value.dynamic_enums
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let name1 = value.name
          size += (ctx.string)(name1)
          let values = value.values
          size += ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(values)
          return size
        })(value[i])
        }
        return size
      })(dynamic_enums)
      let enum_constraints = value.enum_constraints
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let value_index = value.value_index
          size += (ctx.li32)(value_index)
          let enum_index = value.enum_index
          size += (ctx.li32)(enum_index)
          let constraints = value.constraints
          size += ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += ((value) => {
              let size = 0
              let constraint = value.constraint
              size += ((value) => {
                return (ctx.u8)({"cheats_enabled":0,"operator_permissions":1,"host_permissions":2}[value] || value)
              })(constraint)
              return size
            })(value[i])
            }
            return size
          })(constraints)
          return size
        })(value[i])
        }
        return size
      })(enum_constraints)
      return size
    },
    packet_command_request: (value) => {
      let size = 0
      let command = value.command
      size += (ctx.string)(command)
      let origin = value.origin
      size += (ctx.CommandOrigin)(origin)
      let interval = value.interval
      size += (ctx.bool)(interval)
      return size
    },
    packet_command_block_update: (value) => {
      let size = 0
      let is_block = value.is_block
      size += (ctx.bool)(is_block)
      let position = value.position
      size += ((value) => {
        switch (is_block) {
          case true: return (ctx.BlockCoordinates)(value)
          default: return ((value) => {
            let size = 0
            let minecart_entity_runtime_id = value.minecart_entity_runtime_id
            size += (ctx.varint64)(minecart_entity_runtime_id)
            return size
          })(value)
        }
      })(position)
      let mode = value.mode
      size += ((value) => {
        switch (is_block) {
          case true: return ((value) => {
            return (ctx.varint)({"impulse":0,"repeat":1,"chain":2}[value] || value)
          })(value)
          default: return ((value) => {
            let size = 0
            let minecart_entity_runtime_id = value.minecart_entity_runtime_id
            size += (ctx.varint64)(minecart_entity_runtime_id)
            return size
          })(value)
        }
      })(mode)
      let needs_redstone = value.needs_redstone
      size += ((value) => {
        switch (is_block) {
          case true: return (ctx.bool)(value)
          default: return ((value) => {
            let size = 0
            let minecart_entity_runtime_id = value.minecart_entity_runtime_id
            size += (ctx.varint64)(minecart_entity_runtime_id)
            return size
          })(value)
        }
      })(needs_redstone)
      let conditional = value.conditional
      size += ((value) => {
        switch (is_block) {
          case true: return (ctx.bool)(value)
          default: return ((value) => {
            let size = 0
            let minecart_entity_runtime_id = value.minecart_entity_runtime_id
            size += (ctx.varint64)(minecart_entity_runtime_id)
            return size
          })(value)
        }
      })(conditional)
      let minecart_entity_runtime_id = value.minecart_entity_runtime_id
      size += ((value) => {
        switch (is_block) {
          default: return (ctx.varint64)(value)
        }
      })(minecart_entity_runtime_id)
      let command = value.command
      size += (ctx.string)(command)
      let last_output = value.last_output
      size += (ctx.string)(last_output)
      let name = value.name
      size += (ctx.string)(name)
      let should_track_output = value.should_track_output
      size += (ctx.bool)(should_track_output)
      let tick_delay = value.tick_delay
      size += (ctx.li32)(tick_delay)
      let execute_on_first_tick = value.execute_on_first_tick
      size += (ctx.bool)(execute_on_first_tick)
      return size
    },
    packet_command_output: (value) => {
      let size = 0
      let origin = value.origin
      size += (ctx.CommandOrigin)(origin)
      let output_type = value.output_type
      size += ((value) => {
        return (ctx.i8)({"last":1,"silent":2,"all":3,"data_set":4}[value] || value)
      })(output_type)
      let success_count = value.success_count
      size += (ctx.varint)(success_count)
      let output = value.output
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let success = value.success
          size += (ctx.bool)(success)
          let message_id = value.message_id
          size += (ctx.string)(message_id)
          let paramaters1 = value.paramaters
          size += ((value) => {
            let size = (ctx.varint)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += (ctx.string)(value[i])
            }
            return size
          })(paramaters1)
          return size
        })(value[i])
        }
        return size
      })(output)
      let data_set = value.data_set
      size += ((value) => {
        switch (output_type) {
          case "data_set": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(data_set)
      return size
    },
    packet_update_trade: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let window_type = value.window_type
      size += (ctx.WindowType)(window_type)
      let size1 = value.size
      size += (ctx.varint)(size1)
      let trade_tier = value.trade_tier
      size += (ctx.varint)(trade_tier)
      let villager_unique_id = value.villager_unique_id
      size += (ctx.varint64)(villager_unique_id)
      let entity_unique_id = value.entity_unique_id
      size += (ctx.varint64)(entity_unique_id)
      let display_name = value.display_name
      size += (ctx.string)(display_name)
      let new_trading_ui = value.new_trading_ui
      size += (ctx.bool)(new_trading_ui)
      let economic_trades = value.economic_trades
      size += (ctx.bool)(economic_trades)
      let offers = value.offers
      size += (ctx.nbt)(offers)
      return size
    },
    packet_update_equipment: (value) => {
      let size = 0
      let window_id = value.window_id
      size += (ctx.WindowID)(window_id)
      let window_type = value.window_type
      size += (ctx.WindowType)(window_type)
      let size1 = value.size
      size += (ctx.u8)(size1)
      let entity_id = value.entity_id
      size += (ctx.zigzag64)(entity_id)
      let inventory = value.inventory
      size += (ctx.nbt)(inventory)
      return size
    },
    packet_resource_pack_data_info: (value) => {
      let size = 0
      let pack_id = value.pack_id
      size += (ctx.string)(pack_id)
      let max_chunk_size = value.max_chunk_size
      size += (ctx.lu32)(max_chunk_size)
      let chunk_count = value.chunk_count
      size += (ctx.lu32)(chunk_count)
      let size1 = value.size
      size += (ctx.lu64)(size1)
      let hash = value.hash
      size += (ctx.ByteArray)(hash)
      let is_premium = value.is_premium
      size += (ctx.bool)(is_premium)
      let pack_type = value.pack_type
      size += ((value) => {
        return (ctx.u8)({"addon":1,"cached":2,"copy_protected":3,"behavior":4,"persona_piece":5,"resources":6,"skins":7,"world_template":8}[value] || value)
      })(pack_type)
      return size
    },
    packet_resource_pack_chunk_data: (value) => {
      let size = 0
      let pack_id = value.pack_id
      size += (ctx.string)(pack_id)
      let chunk_index = value.chunk_index
      size += (ctx.lu32)(chunk_index)
      let progress = value.progress
      size += (ctx.lu64)(progress)
      let payload = value.payload
      size += (ctx.ByteArray)(payload)
      return size
    },
    packet_resource_pack_chunk_request: (value) => {
      let size = 0
      let pack_id = value.pack_id
      size += (ctx.string)(pack_id)
      let chunk_index = value.chunk_index
      size += (ctx.lu32)(chunk_index)
      return size
    },
    packet_transfer: (value) => {
      let size = 0
      let server_address = value.server_address
      size += (ctx.string)(server_address)
      let port = value.port
      size += (ctx.lu16)(port)
      return size
    },
    packet_play_sound: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let coordinates = value.coordinates
      size += (ctx.BlockCoordinates)(coordinates)
      let volume = value.volume
      size += (ctx.lf32)(volume)
      let pitch = value.pitch
      size += (ctx.lf32)(pitch)
      return size
    },
    packet_stop_sound: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let stop_all = value.stop_all
      size += (ctx.bool)(stop_all)
      return size
    },
    packet_set_title: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.zigzag32)({"clear":0,"reset":1,"set_title":2,"set_subtitle":3,"action_bar_message":4,"set_durations":5,"set_title_json":6,"set_subtitle_json":7,"action_bar_message_json":8}[value] || value)
      })(type)
      let text = value.text
      size += (ctx.string)(text)
      let fade_in_time = value.fade_in_time
      size += (ctx.zigzag32)(fade_in_time)
      let stay_time = value.stay_time
      size += (ctx.zigzag32)(stay_time)
      let fade_out_time = value.fade_out_time
      size += (ctx.zigzag32)(fade_out_time)
      return size
    },
    packet_add_behavior_tree: (value) => {
      let size = 0
      let behaviortree = value.behaviortree
      size += (ctx.string)(behaviortree)
      return size
    },
    packet_structure_block_update: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let structure_name = value.structure_name
      size += (ctx.string)(structure_name)
      let data_field = value.data_field
      size += (ctx.string)(data_field)
      let include_players = value.include_players
      size += (ctx.bool)(include_players)
      let show_bounding_box = value.show_bounding_box
      size += (ctx.bool)(show_bounding_box)
      let structure_block_type = value.structure_block_type
      size += (ctx.zigzag32)(structure_block_type)
      let settings = value.settings
      size += (ctx.StructureBlockSettings)(settings)
      let redstone_save_mode = value.redstone_save_mode
      size += (ctx.zigzag32)(redstone_save_mode)
      let should_trigger = value.should_trigger
      size += (ctx.bool)(should_trigger)
      return size
    },
    packet_show_store_offer: (value) => {
      let size = 0
      let offer_id = value.offer_id
      size += (ctx.string)(offer_id)
      let show_all = value.show_all
      size += (ctx.bool)(show_all)
      return size
    },
    packet_purchase_receipt: (value) => {
      let size = 0
      let receipts = value.receipts
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.string)(value[i])
        }
        return size
      })(receipts)
      return size
    },
    packet_player_skin: (value) => {
      let size = 0
      let uuid = value.uuid
      size += (ctx.uuid)(uuid)
      let skin = value.skin
      size += (ctx.Skin)(skin)
      let skin_name = value.skin_name
      size += (ctx.string)(skin_name)
      let old_skin_name = value.old_skin_name
      size += (ctx.string)(old_skin_name)
      let is_verified = value.is_verified
      size += (ctx.bool)(is_verified)
      return size
    },
    packet_sub_client_login: (value) => {
      let size = 0
      let tokens = value.tokens
      size += ((value) => {
        const payloadSize = (ctx.LoginTokens)(value)
            return (ctx.varint)(payloadSize) + payloadSize
      })(tokens)
      return size
    },
    packet_initiate_web_socket_connection: (value) => {
      let size = 0
      let server = value.server
      size += (ctx.string)(server)
      return size
    },
    packet_set_last_hurt_by: (value) => {
      let size = 0
      let entity_type = value.entity_type
      size += (ctx.varint)(entity_type)
      return size
    },
    packet_book_edit: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.u8)({"replace_page":0,"add_page":1,"delete_page":2,"swap_pages":3,"sign":4}[value] || value)
      })(type)
      let slot = value.slot
      size += (ctx.u8)(slot)
      let page_number = value.page_number
      size += ((value) => {
        switch (type) {
          case "replace_page": return (ctx.u8)(value)
          case "add_page": return (ctx.u8)(value)
          case "delete_page": return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(page_number)
      let text = value.text
      size += ((value) => {
        switch (type) {
          case "replace_page": return (ctx.string)(value)
          case "add_page": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(text)
      let photo_name = value.photo_name
      size += ((value) => {
        switch (type) {
          case "replace_page": return (ctx.string)(value)
          case "add_page": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(photo_name)
      let page1 = value.page1
      size += ((value) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(page1)
      let page2 = value.page2
      size += ((value) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(page2)
      let title = value.title
      size += ((value) => {
        switch (type) {
          case "sign": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(title)
      let author = value.author
      size += ((value) => {
        switch (type) {
          case "sign": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(author)
      let xuid = value.xuid
      size += ((value) => {
        switch (type) {
          case "sign": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(xuid)
      return size
    },
    packet_npc_request: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let request_type = value.request_type
      size += ((value) => {
        return (ctx.u8)({"set_actions":0,"execute_action":1,"execute_closing_commands":2,"set_name":3,"set_skin":4,"set_interaction_text":5}[value] || value)
      })(request_type)
      let command = value.command
      size += (ctx.string)(command)
      let action_type = value.action_type
      size += (ctx.u8)(action_type)
      return size
    },
    packet_photo_transfer: (value) => {
      let size = 0
      let image_name = value.image_name
      size += (ctx.string)(image_name)
      let image_data = value.image_data
      size += (ctx.string)(image_data)
      let book_id = value.book_id
      size += (ctx.string)(book_id)
      return size
    },
    packet_modal_form_request: (value) => {
      let size = 0
      let form_id = value.form_id
      size += (ctx.varint)(form_id)
      let data = value.data
      size += (ctx.string)(data)
      return size
    },
    packet_modal_form_response: (value) => {
      let size = 0
      let form_id = value.form_id
      size += (ctx.varint)(form_id)
      let data = value.data
      size += (ctx.string)(data)
      return size
    },
    packet_server_settings_request: (value) => {
      let size = 0
      return size
    },
    packet_server_settings_response: (value) => {
      let size = 0
      let form_id = value.form_id
      size += (ctx.varint)(form_id)
      let data = value.data
      size += (ctx.string)(data)
      return size
    },
    packet_show_profile: (value) => {
      let size = 0
      let xuid = value.xuid
      size += (ctx.string)(xuid)
      return size
    },
    packet_set_default_game_type: (value) => {
      let size = 0
      let gamemode = value.gamemode
      size += (ctx.GameMode)(gamemode)
      return size
    },
    packet_remove_objective: (value) => {
      let size = 0
      let objective_name = value.objective_name
      size += (ctx.string)(objective_name)
      return size
    },
    packet_set_display_objective: (value) => {
      let size = 0
      let display_slot = value.display_slot
      size += (ctx.string)(display_slot)
      let objective_name = value.objective_name
      size += (ctx.string)(objective_name)
      let display_name = value.display_name
      size += (ctx.string)(display_name)
      let criteria_name = value.criteria_name
      size += (ctx.string)(criteria_name)
      let sort_order = value.sort_order
      size += (ctx.zigzag32)(sort_order)
      return size
    },
    packet_set_score: (value) => {
      let size = 0
      let action = value.action
      size += ((value) => {
        return (ctx.u8)({"change":0,"remove":1}[value] || value)
      })(action)
      let entries = value.entries
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let scoreboard_id = value.scoreboard_id
          size += (ctx.zigzag64)(scoreboard_id)
          let objective_name1 = value.objective_name
          size += (ctx.string)(objective_name1)
          let score = value.score
          size += (ctx.li32)(score)
          let entry_type = value.entry_type
          size += ((value) => {
            switch (action) {
              case "change": return ((value) => {
                return (ctx.i8)({"player":1,"entity":2,"fake_player":3}[value] || value)
              })(value)
              default: return (ctx.void)(value)
            }
          })(entry_type)
          let entity_unique_id1 = value.entity_unique_id
          size += ((value) => {
            switch (action) {
              case "change": return ((value) => {
                switch (entry_type) {
                  case "player": return (ctx.zigzag64)(value)
                  case "entity": return (ctx.zigzag64)(value)
                  default: return (ctx.void)(value)
                }
              })(value)
              default: return (ctx.void)(value)
            }
          })(entity_unique_id1)
          let custom_name = value.custom_name
          size += ((value) => {
            switch (action) {
              case "change": return ((value) => {
                switch (entry_type) {
                  case "fake_player": return (ctx.string)(value)
                  default: return (ctx.void)(value)
                }
              })(value)
              default: return (ctx.void)(value)
            }
          })(custom_name)
          return size
        })(value[i])
        }
        return size
      })(entries)
      return size
    },
    packet_lab_table: (value) => {
      let size = 0
      let action_type = value.action_type
      size += ((value) => {
        return (ctx.u8)({"combine":0,"react":1}[value] || value)
      })(action_type)
      let position = value.position
      size += (ctx.vec3u)(position)
      let reaction_type = value.reaction_type
      size += (ctx.u8)(reaction_type)
      return size
    },
    packet_update_block_synced: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let block_runtime_id = value.block_runtime_id
      size += (ctx.varint)(block_runtime_id)
      let flags = value.flags
      size += (ctx.UpdateBlockFlags)(flags)
      let layer = value.layer
      size += (ctx.varint)(layer)
      let entity_unique_id = value.entity_unique_id
      size += (ctx.zigzag64)(entity_unique_id)
      let transition_type = value.transition_type
      size += ((value) => {
        return (ctx.varint64)({"entity":0,"create":1,"destroy":2}[value] || value)
      })(transition_type)
      return size
    },
    packet_move_entity_delta: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      let flags = value.flags
      size += (ctx.DeltaMoveFlags)(flags)
      let x = value.x
      size += ((value) => {
        switch (flags.has_x) {
          case true: return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(x)
      let y = value.y
      size += ((value) => {
        switch (flags.has_y) {
          case true: return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(y)
      let z = value.z
      size += ((value) => {
        switch (flags.has_z) {
          case true: return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(z)
      let rot_x = value.rot_x
      size += ((value) => {
        switch (flags.has_rot_x) {
          case true: return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(rot_x)
      let rot_y = value.rot_y
      size += ((value) => {
        switch (flags.has_rot_y) {
          case true: return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(rot_y)
      let rot_z = value.rot_z
      size += ((value) => {
        switch (flags.has_rot_z) {
          case true: return (ctx.u8)(value)
          default: return (ctx.void)(value)
        }
      })(rot_z)
      return size
    },
    packet_set_scoreboard_identity: (value) => {
      let size = 0
      let action = value.action
      size += ((value) => {
        return (ctx.i8)({"register_identity":0,"clear_identity":1}[value] || value)
      })(action)
      let entries = value.entries
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let scoreboard_id = value.scoreboard_id
          size += (ctx.zigzag64)(scoreboard_id)
          let entity_unique_id1 = value.entity_unique_id
          size += ((value) => {
            switch (action) {
              case "register_identity": return (ctx.zigzag64)(value)
              default: return (ctx.void)(value)
            }
          })(entity_unique_id1)
          return size
        })(value[i])
        }
        return size
      })(entries)
      return size
    },
    packet_set_local_player_as_initialized: (value) => {
      let size = 0
      let runtime_entity_id = value.runtime_entity_id
      size += (ctx.varint64)(runtime_entity_id)
      return size
    },
    packet_update_soft_enum: (value) => {
      let size = 0
      return size
    },
    packet_network_stack_latency: (value) => {
      let size = 0
      let timestamp = value.timestamp
      size += (ctx.lu64)(timestamp)
      let needs_response = value.needs_response
      size += (ctx.u8)(needs_response)
      return size
    },
    packet_script_custom_event: (value) => {
      let size = 0
      let event_name = value.event_name
      size += (ctx.string)(event_name)
      let event_data = value.event_data
      size += (ctx.string)(event_data)
      return size
    },
    packet_spawn_particle_effect: (value) => {
      let size = 0
      let dimension = value.dimension
      size += (ctx.u8)(dimension)
      let entity_id = value.entity_id
      size += (ctx.zigzag64)(entity_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let particle_name = value.particle_name
      size += (ctx.string)(particle_name)
      return size
    },
    packet_available_entity_identifiers: (value) => {
      let size = 0
      let nbt = value.nbt
      size += (ctx.nbt)(nbt)
      return size
    },
    packet_level_sound_event_v2: (value) => {
      let size = 0
      let sound_id = value.sound_id
      size += (ctx.u8)(sound_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let block_id = value.block_id
      size += (ctx.zigzag32)(block_id)
      let entity_type = value.entity_type
      size += (ctx.string)(entity_type)
      let is_baby_mob = value.is_baby_mob
      size += (ctx.bool)(is_baby_mob)
      let is_global = value.is_global
      size += (ctx.bool)(is_global)
      return size
    },
    packet_network_chunk_publisher_update: (value) => {
      let size = 0
      let coordinates = value.coordinates
      size += (ctx.BlockCoordinates)(coordinates)
      let radius = value.radius
      size += (ctx.varint)(radius)
      return size
    },
    packet_biome_definition_list: (value) => {
      let size = 0
      let nbt = value.nbt
      size += (ctx.nbt)(nbt)
      return size
    },
    packet_level_sound_event: (value) => {
      let size = 0
      let sound_id = value.sound_id
      size += (ctx.SoundType)(sound_id)
      let position = value.position
      size += (ctx.vec3f)(position)
      let extra_data = value.extra_data
      size += (ctx.zigzag32)(extra_data)
      let entity_type = value.entity_type
      size += (ctx.string)(entity_type)
      let is_baby_mob = value.is_baby_mob
      size += (ctx.bool)(is_baby_mob)
      let is_global = value.is_global
      size += (ctx.bool)(is_global)
      return size
    },
    packet_level_event_generic: (value) => {
      let size = 0
      let event_id = value.event_id
      size += (ctx.varint)(event_id)
      let nbt = value.nbt
      size += (ctx.nbtLoop)(nbt)
      return size
    },
    packet_lectern_update: (value) => {
      let size = 0
      let page = value.page
      size += (ctx.u8)(page)
      let page_count = value.page_count
      size += (ctx.u8)(page_count)
      let position = value.position
      size += (ctx.vec3i)(position)
      let drop_book = value.drop_book
      size += (ctx.bool)(drop_book)
      return size
    },
    packet_video_stream_connect: (value) => {
      let size = 0
      let server_uri = value.server_uri
      size += (ctx.string)(server_uri)
      let frame_send_frequency = value.frame_send_frequency
      size += (ctx.lf32)(frame_send_frequency)
      let action = value.action
      size += (ctx.u8)(action)
      let resolution_x = value.resolution_x
      size += (ctx.li32)(resolution_x)
      let resolution_y = value.resolution_y
      size += (ctx.li32)(resolution_y)
      return size
    },
    packet_add_ecs_entity: (value) => {
      let size = 0
      let network_id = value.network_id
      size += (ctx.varint64)(network_id)
      return size
    },
    packet_remove_ecs_entity: (value) => {
      let size = 0
      let network_id = value.network_id
      size += (ctx.varint64)(network_id)
      return size
    },
    packet_client_cache_status: (value) => {
      let size = 0
      let enabled = value.enabled
      size += (ctx.bool)(enabled)
      return size
    },
    packet_on_screen_texture_animation: (value) => {
      let size = 0
      let animation_type = value.animation_type
      size += (ctx.lu32)(animation_type)
      return size
    },
    packet_map_create_locked_copy: (value) => {
      let size = 0
      let original_map_id = value.original_map_id
      size += (ctx.zigzag64)(original_map_id)
      let new_map_id = value.new_map_id
      size += (ctx.zigzag64)(new_map_id)
      return size
    },
    packet_structure_template_data_export_request: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      let settings = value.settings
      size += (ctx.StructureBlockSettings)(settings)
      let request_type = value.request_type
      size += ((value) => {
        return (ctx.u8)({"export_from_save":1,"export_from_load":2,"query_saved_structure":3}[value] || value)
      })(request_type)
      return size
    },
    packet_structure_template_data_export_response: (value) => {
      let size = 0
      let name = value.name
      size += (ctx.string)(name)
      let success = value.success
      size += (ctx.bool)(success)
      let nbt = value.nbt
      size += ((value) => {
        switch (success) {
          case true: return (ctx.nbt)(value)
          default: return (ctx.void)(value)
        }
      })(nbt)
      let response_type = value.response_type
      size += ((value) => {
        return (ctx.u8)({"export":1,"query":2}[value] || value)
      })(response_type)
      return size
    },
    packet_update_block_properties: (value) => {
      let size = 0
      let nbt = value.nbt
      size += (ctx.nbt)(nbt)
      return size
    },
    packet_client_cache_blob_status: (value) => {
      let size = 0
      let misses = value.misses
      size += (ctx.varint)(misses)
      let haves = value.haves
      size += (ctx.varint)(haves)
      let missing = value.missing
      size += ((value) => {
        let size = 0
        for (let i = 0; i < value.length; i++) {
          size += (ctx.lu64)(value[i])
        }
        return size
      })(missing)
      let have = value.have
      size += ((value) => {
        let size = 0
        for (let i = 0; i < value.length; i++) {
          size += (ctx.lu64)(value[i])
        }
        return size
      })(have)
      return size
    },
    packet_client_cache_miss_response: (value) => {
      let size = 0
      let blobs = value.blobs
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.Blob)(value[i])
        }
        return size
      })(blobs)
      return size
    },
    packet_education_settings: (value) => {
      let size = 0
      let CodeBuilderDefaultURI = value.CodeBuilderDefaultURI
      size += (ctx.string)(CodeBuilderDefaultURI)
      let CodeBuilderTitle = value.CodeBuilderTitle
      size += (ctx.string)(CodeBuilderTitle)
      let CanResizeCodeBuilder = value.CanResizeCodeBuilder
      size += (ctx.bool)(CanResizeCodeBuilder)
      let HasOverrideURI = value.HasOverrideURI
      size += (ctx.bool)(HasOverrideURI)
      let OverrideURI = value.OverrideURI
      size += ((value) => {
        switch (HasOverrideURI) {
          case true: return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(OverrideURI)
      let HasQuiz = value.HasQuiz
      size += (ctx.bool)(HasQuiz)
      return size
    },
    packet_multiplayer_settings: (value) => {
      let size = 0
      let action_type = value.action_type
      size += ((value) => {
        return (ctx.zigzag32)({"enable_multiplayer":0,"disable_multiplayer":1,"refresh_join_code":2}[value] || value)
      })(action_type)
      return size
    },
    packet_settings_command: (value) => {
      let size = 0
      let command_line = value.command_line
      size += (ctx.string)(command_line)
      let suppress_output = value.suppress_output
      size += (ctx.bool)(suppress_output)
      return size
    },
    packet_anvil_damage: (value) => {
      let size = 0
      let damage = value.damage
      size += (ctx.u8)(damage)
      let position = value.position
      size += (ctx.BlockCoordinates)(position)
      return size
    },
    packet_completed_using_item: (value) => {
      let size = 0
      let used_item_id = value.used_item_id
      size += (ctx.li16)(used_item_id)
      let use_method = value.use_method
      size += ((value) => {
        return (ctx.li32)({"equip_armor":0,"eat":1,"attack":2,"consume":3,"throw":4,"shoot":5,"place":6,"fill_bottle":7,"fill_bucket":8,"pour_bucket":9,"use_tool":10,"interact":11,"retrieved":12,"dyed":13,"traded":14}[value] || value)
      })(use_method)
      return size
    },
    packet_network_settings: (value) => {
      let size = 0
      let compression_threshold = value.compression_threshold
      size += (ctx.u16)(compression_threshold)
      return size
    },
    packet_player_auth_input: (value) => {
      let size = 0
      let pitch = value.pitch
      size += (ctx.lf32)(pitch)
      let yaw = value.yaw
      size += (ctx.lf32)(yaw)
      let position = value.position
      size += (ctx.vec3f)(position)
      let move_vector = value.move_vector
      size += (ctx.vec2f)(move_vector)
      let head_yaw = value.head_yaw
      size += (ctx.lf32)(head_yaw)
      let input_data = value.input_data
      size += (ctx.InputFlag)(input_data)
      let input_mode = value.input_mode
      size += ((value) => {
        return (ctx.varint)({"unknown":0,"mouse":1,"touch":2,"game_pad":3,"motion_controller":4}[value] || value)
      })(input_mode)
      let play_mode = value.play_mode
      size += ((value) => {
        return (ctx.varint)({"normal":0,"teaser":1,"screen":2,"viewer":3,"reality":4,"placement":5,"living_room":6,"exit_level":7,"exit_level_living_room":8,"num_modes":9}[value] || value)
      })(play_mode)
      let gaze_direction = value.gaze_direction
      size += ((value) => {
        switch (play_mode) {
          case "reality": return (ctx.vec3f)(value)
          default: return (ctx.void)(value)
        }
      })(gaze_direction)
      let tick = value.tick
      size += (ctx.varint64)(tick)
      let delta = value.delta
      size += (ctx.vec3f)(delta)
      let transaction = value.transaction
      size += ((value) => {
        switch (input_data.item_interact) {
          case true: return ((value) => {
            let size = 0
            let legacy1 = value.legacy
            size += (ctx.TransactionLegacy)(legacy1)
            let actions1 = value.actions
            size += (ctx.TransactionActions)(actions1)
            let data1 = value.data
            size += (ctx.TransactionUseItem)(data1)
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(transaction)
      let item_stack_request = value.item_stack_request
      size += ((value) => {
        switch (input_data.item_stack_request) {
          case true: return (ctx.ItemStackRequest)(value)
          default: return (ctx.void)(value)
        }
      })(item_stack_request)
      let block_action = value.block_action
      size += ((value) => {
        switch (input_data.block_action) {
          case true: return ((value) => {
            let size = (ctx.zigzag32)(value.length)
            for (let i = 0; i < value.length; i++) {
              size += ((value) => {
              let size = 0
              let action1 = value.action
              size += (ctx.Action)(action1)
              let position1 = value.position
              size += ((value) => {
                switch (action1) {
                  case "start_break": return (ctx.BlockCoordinates)(value)
                  case "abort_break": return (ctx.BlockCoordinates)(value)
                  case "crack_break": return (ctx.BlockCoordinates)(value)
                  case "predict_break": return (ctx.BlockCoordinates)(value)
                  case "continue_break": return (ctx.BlockCoordinates)(value)
                  default: return (ctx.void)(value)
                }
              })(position1)
              let face1 = value.face
              size += ((value) => {
                switch (action1) {
                  case "start_break": return (ctx.zigzag32)(value)
                  case "abort_break": return (ctx.zigzag32)(value)
                  case "crack_break": return (ctx.zigzag32)(value)
                  case "predict_break": return (ctx.zigzag32)(value)
                  case "continue_break": return (ctx.zigzag32)(value)
                  default: return (ctx.void)(value)
                }
              })(face1)
              return size
            })(value[i])
            }
            return size
          })(value)
          default: return (ctx.void)(value)
        }
      })(block_action)
      return size
    },
    packet_creative_content: (value) => {
      let size = 0
      let items = value.items
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += ((value) => {
          let size = 0
          let entry_id = value.entry_id
          size += (ctx.varint)(entry_id)
          let item1 = value.item
          size += (ctx.ItemLegacy)(item1)
          return size
        })(value[i])
        }
        return size
      })(items)
      return size
    },
    packet_player_enchant_options: (value) => {
      let size = 0
      let options = value.options
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.EnchantOption)(value[i])
        }
        return size
      })(options)
      return size
    },
    packet_item_stack_request: (value) => {
      let size = 0
      let requests = value.requests
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.ItemStackRequest)(value[i])
        }
        return size
      })(requests)
      return size
    },
    packet_item_stack_response: (value) => {
      let size = 0
      let responses = value.responses
      size += (ctx.ItemStackResponses)(responses)
      return size
    },
    packet_player_armor_damage: (value) => {
      let size = 0
      let type = value.type
      size += (ctx.ArmorDamageType)(type)
      let helmet_damage = value.helmet_damage
      size += ((value) => {
        switch (type.head) {
          case true: return (ctx.zigzag32)(value)
          default: return (ctx.void)(value)
        }
      })(helmet_damage)
      let chestplate_damage = value.chestplate_damage
      size += ((value) => {
        switch (type.chest) {
          case true: return (ctx.zigzag32)(value)
          default: return (ctx.void)(value)
        }
      })(chestplate_damage)
      let leggings_damage = value.leggings_damage
      size += ((value) => {
        switch (type.legs) {
          case true: return (ctx.zigzag32)(value)
          default: return (ctx.void)(value)
        }
      })(leggings_damage)
      let boots_damage = value.boots_damage
      size += ((value) => {
        switch (type.feet) {
          case true: return (ctx.zigzag32)(value)
          default: return (ctx.void)(value)
        }
      })(boots_damage)
      return size
    },
    packet_update_player_game_type: (value) => {
      let size = 0
      let gamemode = value.gamemode
      size += (ctx.GameMode)(gamemode)
      let player_unique_id = value.player_unique_id
      size += (ctx.zigzag64)(player_unique_id)
      return size
    },
    packet_position_tracking_db_request: (value) => {
      let size = 0
      let action = value.action
      size += ((value) => {
        return (ctx.u8)({"query":0}[value] || value)
      })(action)
      let tracking_id = value.tracking_id
      size += (ctx.zigzag32)(tracking_id)
      return size
    },
    packet_position_tracking_db_broadcast: (value) => {
      let size = 0
      let broadcast_action = value.broadcast_action
      size += ((value) => {
        return (ctx.u8)({"update":0,"destory":1,"not_found":2}[value] || value)
      })(broadcast_action)
      let tracking_id = value.tracking_id
      size += (ctx.zigzag32)(tracking_id)
      let nbt = value.nbt
      size += (ctx.nbt)(nbt)
      return size
    },
    packet_packet_violation_warning: (value) => {
      let size = 0
      let violation_type = value.violation_type
      size += ((value) => {
        return (ctx.zigzag32)({"malformed":0}[value] || value)
      })(violation_type)
      let severity = value.severity
      size += ((value) => {
        return (ctx.zigzag32)({"warning":0,"final_warning":1,"terminating":2}[value] || value)
      })(severity)
      let packet_id = value.packet_id
      size += (ctx.zigzag32)(packet_id)
      let reason = value.reason
      size += (ctx.string)(reason)
      return size
    },
    packet_motion_prediction_hints: (value) => {
      let size = 0
      let entity_runtime_id = value.entity_runtime_id
      size += (ctx.varint64)(entity_runtime_id)
      let velocity = value.velocity
      size += (ctx.vec3f)(velocity)
      let on_ground = value.on_ground
      size += (ctx.bool)(on_ground)
      return size
    },
    packet_animate_entity: (value) => {
      let size = 0
      let animation = value.animation
      size += (ctx.string)(animation)
      let next_state = value.next_state
      size += (ctx.string)(next_state)
      let stop_condition = value.stop_condition
      size += (ctx.string)(stop_condition)
      let controller = value.controller
      size += (ctx.string)(controller)
      let blend_out_time = value.blend_out_time
      size += (ctx.lf32)(blend_out_time)
      let runtime_entity_ids = value.runtime_entity_ids
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.varint64)(value[i])
        }
        return size
      })(runtime_entity_ids)
      return size
    },
    packet_camera_shake: (value) => {
      let size = 0
      let intensity = value.intensity
      size += (ctx.lf32)(intensity)
      let duration = value.duration
      size += (ctx.lf32)(duration)
      let type = value.type
      size += (ctx.u8)(type)
      let action = value.action
      size += ((value) => {
        return (ctx.u8)({"add":0,"stop":1}[value] || value)
      })(action)
      return size
    },
    packet_player_fog: (value) => {
      let size = 0
      let stack = value.stack
      size += ((value) => {
        let size = (ctx.varint)(value.length)
        for (let i = 0; i < value.length; i++) {
          size += (ctx.string)(value[i])
        }
        return size
      })(stack)
      return size
    },
    packet_correct_player_move_prediction: (value) => {
      let size = 0
      let position = value.position
      size += (ctx.vec3f)(position)
      let delta = value.delta
      size += (ctx.vec3f)(delta)
      let on_ground = value.on_ground
      size += (ctx.bool)(on_ground)
      let tick = value.tick
      size += (ctx.varint64)(tick)
      return size
    },
    packet_item_component: (value) => {
      let size = 0
      let entries = value.entries
      size += (ctx.ItemComponentList)(entries)
      return size
    },
    packet_filter_text_packet: (value) => {
      let size = 0
      let text = value.text
      size += (ctx.string)(text)
      let from_server = value.from_server
      size += (ctx.bool)(from_server)
      return size
    },
    packet_debug_renderer: (value) => {
      let size = 0
      let type = value.type
      size += ((value) => {
        return (ctx.li32)({"clear":1,"add_cube":2}[value] || value)
      })(type)
      let text = value.text
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.string)(value)
          default: return (ctx.void)(value)
        }
      })(text)
      let position = value.position
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.vec3f)(value)
          default: return (ctx.void)(value)
        }
      })(position)
      let red = value.red
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(red)
      let green = value.green
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(green)
      let blue = value.blue
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(blue)
      let alpha = value.alpha
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.lf32)(value)
          default: return (ctx.void)(value)
        }
      })(alpha)
      let duration = value.duration
      size += ((value) => {
        switch (type) {
          case "clear": return (ctx.void)(value)
          case "add_cube": return (ctx.li64)(value)
          default: return (ctx.void)(value)
        }
      })(duration)
      return size
    },
    string: (value) => {
      let size = Buffer.byteLength(value, 'utf8')
      size += (ctx.varint)(size)
      return size
    },
    ByteArray: (value) => {
      let size = value instanceof Buffer ? value.length : Buffer.from(value).length
      size += (ctx.varint)(size)
      return size
    },
    SignedByteArray: (value) => {
      let size = value instanceof Buffer ? value.length : Buffer.from(value).length
      size += (ctx.zigzag32)(size)
      return size
    },
    LittleString: (value) => {
      let size = Buffer.byteLength(value, 'utf8')
      size += (ctx.li32)(size)
      return size
    },
    ShortArray: (value) => {
      let size = value instanceof Buffer ? value.length : Buffer.from(value).length
      size += (ctx.li16)(size)
      return size
    },
    MetadataFlags1: (value) => {
      const flags = {"onfire": 1n,"sneaking": 2n,"riding": 4n,"sprinting": 8n,"action": 16n,"invisible": 32n,"tempted": 64n,"inlove": 128n,"saddled": 256n,"powered": 512n,"ignited": 1024n,"baby": 2048n,"converting": 4096n,"critical": 8192n,"can_show_nametag": 16384n,"always_show_nametag": 32768n,"no_ai": 65536n,"silent": 131072n,"wallclimbing": 262144n,"can_climb": 524288n,"swimmer": 1048576n,"can_fly": 2097152n,"walker": 4194304n,"resting": 8388608n,"sitting": 16777216n,"angry": 33554432n,"interested": 67108864n,"charged": 134217728n,"tamed": 268435456n,"orphaned": 536870912n,"leashed": 1073741824n,"sheared": 2147483648n,"gliding": 4294967296n,"elder": 8589934592n,"moving": 17179869184n,"breathing": 34359738368n,"chested": 68719476736n,"stackable": 137438953472n,"showbase": 274877906944n,"rearing": 549755813888n,"vibrating": 1099511627776n,"idling": 2199023255552n,"evoker_spell": 4398046511104n,"charge_attack": 8796093022208n,"wasd_controlled": 17592186044416n,"can_power_jump": 35184372088832n,"linger": 70368744177664n,"has_collision": 140737488355328n,"affected_by_gravity": 281474976710656n,"fire_immune": 562949953421312n,"dancing": 1125899906842624n,"enchanted": 2251799813685248n,"show_trident_rope": 4503599627370496n,"container_private": 9007199254740992n,"transforming": 18014398509481984n,"spin_attack": 36028797018963968n,"swimming": 72057594037927936n,"bribed": 144115188075855872n,"pregnant": 288230376151711744n,"laying_egg": 576460752303423488n,"rider_can_pick": 1152921504606846976n,"transition_sitting": 2305843009213693952n,"eating": 4611686018427387904n,"laying_down": 9223372036854775808n,}
          let val = value._value || 0n
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.zigzag64)(val)
    },
    MetadataFlags2: (value) => {
      const flags = {"sneezing": 1n,"trusting": 2n,"rolling": 4n,"scared": 8n,"in_scaffolding": 16n,"over_scaffolding": 32n,"fall_through_scaffolding": 64n,"blocking": 128n,"transition_blocking": 256n,"blocked_using_shield": 512n,"blocked_using_damaged_shield": 1024n,"sleeping": 2048n,"wants_to_wake": 4096n,"trade_interest": 8192n,"door_breaker": 16384n,"breaking_obstruction": 32768n,"door_opener": 65536n,"illager_captain": 131072n,"stunned": 262144n,"roaring": 524288n,"delayed_attacking": 1048576n,"avoiding_mobs": 2097152n,"avoiding_block": 4194304n,"facing_target_to_range_attack": 8388608n,"hidden_when_invisible": 16777216n,"is_in_ui": 33554432n,"stalking": 67108864n,"emoting": 134217728n,"celebrating": 268435456n,"admiring": 536870912n,"celebrating_special": 1073741824n,}
          let val = value._value || 0n
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.zigzag64)(val)
    },
    UpdateBlockFlags: (value) => {
      const flags = {"neighbors":1,"network":2,"no_graphic":4,"unused":8,"priority":16}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val)
    },
    AdventureFlags: (value) => {
      const flags = {"world_immutable":1,"no_pvp":2,"auto_jump":32,"allow_flight":64,"no_clip":128,"world_builder":256,"flying":512,"muted":1024}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val)
    },
    ActionPermissions: (value) => {
      const flags = {"mine":65537,"doors_and_switches":65538,"open_containers":65540,"attack_players":65544,"attack_mobs":65552,"operator":65568,"teleport":65664,"build":65792,"default":66048}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val)
    },
    UpdateMapFlags: (value) => {
      const flags = {"void": 1,"texture": 2,"decoration": 4,"initialisation": 8,}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val)
    },
    CommandFlags: (value) => {
        return 1
    },
    DeltaMoveFlags: (value) => {
      const flags = {"has_x":1,"has_y":2,"has_z":4,"has_rot_x":8,"has_rot_y":16,"has_rot_z":32,"on_ground":64,"teleport":128,"force_move":256}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.lu16)(val)
    },
    InputFlag: (value) => {
      const flags = {"ascend": 1n,"descend": 2n,"north_jump": 4n,"jump_down": 8n,"sprint_down": 16n,"change_height": 32n,"jumping": 64n,"auto_jumping_in_water": 128n,"sneaking": 256n,"sneak_down": 512n,"up": 1024n,"down": 2048n,"left": 4096n,"right": 8192n,"up_left": 16384n,"up_right": 32768n,"want_up": 65536n,"want_down": 131072n,"want_down_slow": 262144n,"want_up_slow": 524288n,"sprinting": 1048576n,"ascend_scaffolding": 2097152n,"descend_scaffolding": 4194304n,"sneak_toggle_down": 8388608n,"persist_sneak": 16777216n,"start_sprinting": 33554432n,"stop_sprinting": 67108864n,"start_sneaking": 134217728n,"stop_sneaking": 268435456n,"start_swimming": 536870912n,"stop_swimming": 1073741824n,"start_jumping": 2147483648n,"start_gliding": 4294967296n,"stop_gliding": 8589934592n,"item_interact": 17179869184n,"block_action": 34359738368n,"item_stack_request": 68719476736n,}
          let val = value._value || 0n
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint64)(val)
    },
    ArmorDamageType: (value) => {
      const flags = {"head":1,"chest":2,"legs":4,"feet":8}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.u8)(val)
    }
  }
  return ctx
}