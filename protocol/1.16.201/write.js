module.exports = native => {
  const ctx = {
    nbtLoop: (value, buffer, offset) => {
      for (const val of value) {
        offset = ctx.nbt(val, buffer, offset)
      }
      buffer.writeUint8(0, offset)
      return offset + 1
    },
    byterot: (value, buffer, offset) => {
      const val = (value / (360 / 256))
      buffer.writeUint8(val, offset)
      return offset + 1
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
    BehaviourPackInfos: (value, buffer, offset) => {
      offset = (ctx.li16)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let uuid = value.uuid
        offset = (ctx.string)(uuid, buffer, offset)
        let version = value.version
        offset = (ctx.string)(version, buffer, offset)
        let size1 = value.size
        offset = (ctx.lu64)(size1, buffer, offset)
        let content_key = value.content_key
        offset = (ctx.string)(content_key, buffer, offset)
        let sub_pack_name = value.sub_pack_name
        offset = (ctx.string)(sub_pack_name, buffer, offset)
        let content_identity = value.content_identity
        offset = (ctx.string)(content_identity, buffer, offset)
        let has_scripts = value.has_scripts
        offset = (ctx.bool)(has_scripts, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    TexturePackInfos: (value, buffer, offset) => {
      offset = (ctx.li16)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let uuid = value.uuid
        offset = (ctx.string)(uuid, buffer, offset)
        let version = value.version
        offset = (ctx.string)(version, buffer, offset)
        let size1 = value.size
        offset = (ctx.lu64)(size1, buffer, offset)
        let content_key = value.content_key
        offset = (ctx.string)(content_key, buffer, offset)
        let sub_pack_name = value.sub_pack_name
        offset = (ctx.string)(sub_pack_name, buffer, offset)
        let content_identity = value.content_identity
        offset = (ctx.string)(content_identity, buffer, offset)
        let has_scripts = value.has_scripts
        offset = (ctx.bool)(has_scripts, buffer, offset)
        let rtx_enabled = value.rtx_enabled
        offset = (ctx.bool)(rtx_enabled, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    ResourcePackIdVersions: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let uuid = value.uuid
        offset = (ctx.string)(uuid, buffer, offset)
        let version = value.version
        offset = (ctx.string)(version, buffer, offset)
        let name = value.name
        offset = (ctx.string)(name, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    ResourcePackIds: (value, buffer, offset) => {
      offset = (ctx.li16)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = (ctx.string)(value[i], buffer, offset)
      }
      return offset
    },
    Experiment: (value, buffer, offset) => {
      let name = value.name
      offset = (ctx.string)(name, buffer, offset)
      let enabled = value.enabled
      offset = (ctx.bool)(enabled, buffer, offset)
      return offset
    },
    Experiments: (value, buffer, offset) => {
      offset = (ctx.li32)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = (ctx.Experiment)(value[i], buffer, offset)
      }
      return offset
    },
    GameMode: (value, buffer, offset) => {
      return (ctx.zigzag32)({"survival":0,"creative":1,"adventure":2,"survival_spectator":3,"creative_spectator":4,"fallback":5}[value] || value, buffer, offset)
    },
    GameRule: (value, buffer, offset) => {
      let name = value.name
      offset = (ctx.string)(name, buffer, offset)
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"bool":1,"int":2,"float":3}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let value1 = value.value
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "bool": return (ctx.bool)(value, buffer, offset)
          case "int": return (ctx.zigzag32)(value, buffer, offset)
          case "float": return (ctx.lf32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(value1, buffer, offset)
      return offset
    },
    GameRules: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = (ctx.GameRule)(value[i], buffer, offset)
      }
      return offset
    },
    Blob: (value, buffer, offset) => {
      let hash = value.hash
      offset = (ctx.lu64)(hash, buffer, offset)
      let payload = value.payload
      offset = (ctx.ByteArray)(payload, buffer, offset)
      return offset
    },
    BlockPalette: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        let state = value.state
        offset = (ctx.nbt)(state, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Itemstates: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        let runtime_id = value.runtime_id
        offset = (ctx.li16)(runtime_id, buffer, offset)
        let component_based = value.component_based
        offset = (ctx.bool)(component_based, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Item: (value, buffer, offset) => {
      let network_id = value.network_id
      offset = (ctx.zigzag32)(network_id, buffer, offset)
      let auxiliary_value = value.auxiliary_value
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return (ctx.zigzag32)(value, buffer, offset)
        }
      })(auxiliary_value, buffer, offset)
      let has_nbt = value.has_nbt
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return ((value, buffer, offset) => {
            return (ctx.lu16)({"false":0,"true":65535}[value] || value, buffer, offset)
          })(value, buffer, offset)
        }
      })(has_nbt, buffer, offset)
      let nbt = value.nbt
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return ((value, buffer, offset) => {
            switch (has_nbt) {
              case true: return ((value, buffer, offset) => {
                let version = value.version
                offset = (ctx.u8)(version, buffer, offset)
                let nbt1 = value.nbt
                offset = (ctx.nbt)(nbt1, buffer, offset)
                return offset
              })(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(value, buffer, offset)
        }
      })(nbt, buffer, offset)
      let can_place_on = value.can_place_on
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return ((value, buffer, offset) => {
            offset = (ctx.zigzag32)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
        }
      })(can_place_on, buffer, offset)
      let can_destroy = value.can_destroy
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return ((value, buffer, offset) => {
            offset = (ctx.zigzag32)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
        }
      })(can_destroy, buffer, offset)
      let blocking_tick = value.blocking_tick
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 355: return (ctx.zigzag64)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(blocking_tick, buffer, offset)
      return offset
    },
    vec3i: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.zigzag32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.zigzag32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.zigzag32)(z, buffer, offset)
      return offset
    },
    vec3u: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.varint)(x, buffer, offset)
      let y = value.y
      offset = (ctx.varint)(y, buffer, offset)
      let z = value.z
      offset = (ctx.varint)(z, buffer, offset)
      return offset
    },
    vec3f: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.lf32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      return offset
    },
    vec2f: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      return offset
    },
    MetadataDictionary: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let key = value.key
        offset = ((value, buffer, offset) => {
          return (ctx.varint)({"index":0,"health":1,"variant":2,"color":3,"nametag":4,"owner_eid":5,"target_eid":6,"air":7,"potion_color":8,"potion_ambient":9,"jump_duration":10,"hurt_time":11,"hurt_direction":12,"paddle_time_left":13,"paddle_time_right":14,"experience_value":15,"minecart_display_block":16,"minecart_display_offset":17,"minecart_has_display":18,"old_swell":20,"swell_dir":21,"charge_amount":22,"enderman_held_runtime_id":23,"entity_age":24,"player_flags":26,"player_index":27,"player_bed_position":28,"fireball_power_x":29,"fireball_power_y":30,"fireball_power_z":31,"aux_power":32,"fish_x":33,"fish_z":34,"fish_angle":35,"potion_aux_value":36,"lead_holder_eid":37,"scale":38,"interactive_tag":39,"npc_skin_id":40,"url_tag":41,"max_airdata_max_air":42,"mark_variant":43,"container_type":44,"container_base_size":45,"container_extra_slots_per_strength":46,"block_target":47,"wither_invulnerable_ticks":48,"wither_target_1":49,"wither_target_2":50,"wither_target_3":51,"aerial_attack":52,"boundingbox_width":53,"boundingbox_height":54,"fuse_length":55,"rider_seat_position":56,"rider_rotation_locked":57,"rider_max_rotation":58,"rider_min_rotation":59,"area_effect_cloud_radius":60,"area_effect_cloud_waiting":61,"area_effect_cloud_particle_id":62,"shulker_peek_id":63,"shulker_attach_face":64,"shulker_attached":65,"shulker_attach_pos":66,"trading_player_eid":67,"trading_career":68,"has_command_block":69,"command_block_command":70,"command_block_last_output":71,"command_block_track_output":72,"controlling_rider_seat_number":73,"strength":74,"max_strength":75,"spell_casting_color":76,"limited_life":77,"armor_stand_pose_index":78,"ender_crystal_time_offset":79,"always_show_nametag":80,"color_2":81,"name_author":82,"score_tag":83,"balloon_attached_entity":84,"pufferfish_size":85,"bubble_time":86,"agent":87,"sitting_amount":88,"sitting_amount_previous":89,"eating_counter":90,"flags_extended":91,"laying_amount":92,"laying_amount_previous":93,"duration":94,"spawn_time":95,"change_rate":96,"change_on_pickup":97,"pickup_count":98,"interact_text":99,"trade_tier":100,"max_trade_tier":101,"trade_experience":102,"skin_id":103,"spawning_frames":104,"command_block_tick_delay":105,"command_block_execute_on_first_tick":106,"ambient_sound_interval":107,"ambient_sound_interval_range":108,"ambient_sound_event_name":109,"fall_damage_multiplier":110,"name_raw_text":111,"can_ride_target":112,"low_tier_cured_discount":113,"high_tier_cured_discount":114,"nearby_cured_discount":115,"nearby_cured_discount_timestamp":116,"hitbox":117,"is_buoyant":118,"buoyancy_data":119}[value] || value, buffer, offset)
        })(key, buffer, offset)
        let type1 = value.type
        offset = ((value, buffer, offset) => {
          return (ctx.varint)({"byte":0,"short":1,"int":2,"float":3,"string":4,"compound":5,"vec3i":6,"long":7,"vec3f":8}[value] || value, buffer, offset)
        })(type1, buffer, offset)
        let value2 = value.value
        offset = ((value, buffer, offset) => {
          switch (type1) {
            case "byte": return (ctx.i8)(value, buffer, offset)
            case "short": return (ctx.li16)(value, buffer, offset)
            case "int": return (ctx.zigzag32)(value, buffer, offset)
            case "float": return (ctx.lf32)(value, buffer, offset)
            case "string": return (ctx.string)(value, buffer, offset)
            case "compound": return (ctx.nbt)(value, buffer, offset)
            case "vec3i": return (ctx.vec3i)(value, buffer, offset)
            case "long": return (ctx.zigzag64)(value, buffer, offset)
            case "vec3f": return (ctx.vec3f)(value, buffer, offset)
            default: return (ctx.void)(value, buffer, offset)
          }
        })(value2, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Link: (value, buffer, offset) => {
      let ridden_entity_id = value.ridden_entity_id
      offset = (ctx.zigzag64)(ridden_entity_id, buffer, offset)
      let rider_entity_id = value.rider_entity_id
      offset = (ctx.zigzag64)(rider_entity_id, buffer, offset)
      let type = value.type
      offset = (ctx.u8)(type, buffer, offset)
      let immediate = value.immediate
      offset = (ctx.bool)(immediate, buffer, offset)
      let rider_initiated = value.rider_initiated
      offset = (ctx.bool)(rider_initiated, buffer, offset)
      return offset
    },
    Links: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = (ctx.Link)(value[i], buffer, offset)
      }
      return offset
    },
    EntityAttributes: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        let min = value.min
        offset = (ctx.lf32)(min, buffer, offset)
        let value2 = value.value
        offset = (ctx.lf32)(value2, buffer, offset)
        let max = value.max
        offset = (ctx.lf32)(max, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Rotation: (value, buffer, offset) => {
      let yaw = value.yaw
      offset = (ctx.byterot)(yaw, buffer, offset)
      let pitch = value.pitch
      offset = (ctx.byterot)(pitch, buffer, offset)
      let head_yaw = value.head_yaw
      offset = (ctx.byterot)(head_yaw, buffer, offset)
      return offset
    },
    BlockCoordinates: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.zigzag32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.varint)(y, buffer, offset)
      let z = value.z
      offset = (ctx.zigzag32)(z, buffer, offset)
      return offset
    },
    PlayerAttributes: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let min = value.min
        offset = (ctx.lf32)(min, buffer, offset)
        let max = value.max
        offset = (ctx.lf32)(max, buffer, offset)
        let current = value.current
        offset = (ctx.lf32)(current, buffer, offset)
        let default1 = value.default
        offset = (ctx.lf32)(default1, buffer, offset)
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Transaction: (value, buffer, offset) => {
      let legacy_request_id = value.legacy_request_id
      offset = (ctx.zigzag32)(legacy_request_id, buffer, offset)
      let legacy_transactions = value.legacy_transactions
      offset = ((value, buffer, offset) => {
        switch (legacy_request_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = ((value, buffer, offset) => {
              let container_id = value.container_id
              offset = (ctx.u8)(container_id, buffer, offset)
              let changed_slots = value.changed_slots
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = ((value, buffer, offset) => {
                  let slot_id = value.slot_id
                  offset = (ctx.u8)(slot_id, buffer, offset)
                  return offset
                })(value[i], buffer, offset)
                }
                return offset
              })(changed_slots, buffer, offset)
              return offset
            })(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
        }
      })(legacy_transactions, buffer, offset)
      let transaction_type = value.transaction_type
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"normal":0,"inventory_mismatch":1,"item_use":2,"item_use_on_entity":3,"item_release":4}[value] || value, buffer, offset)
      })(transaction_type, buffer, offset)
      let network_ids = value.network_ids
      offset = (ctx.bool)(network_ids, buffer, offset)
      let inventory_actions = value.inventory_actions
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let source_type = value.source_type
          offset = ((value, buffer, offset) => {
            return (ctx.varint)({"container":0,"global":1,"world_interaction":2,"creative":3,"craft_slot":100,"craft":99999}[value] || value, buffer, offset)
          })(source_type, buffer, offset)
          let inventory_id = value.inventory_id
          offset = ((value, buffer, offset) => {
            switch (source_type) {
              case "container": return (ctx.varint)(value, buffer, offset)
              case "creative": return (ctx.varint)(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(inventory_id, buffer, offset)
          let flags = value.flags
          offset = ((value, buffer, offset) => {
            switch (source_type) {
              case "world_interaction": return (ctx.varint)(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(flags, buffer, offset)
          let action = value.action
          offset = ((value, buffer, offset) => {
            switch (source_type) {
              case "craft": return (ctx.varint)(value, buffer, offset)
              case "craft_slot": return (ctx.varint)(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(action, buffer, offset)
          let slot = value.slot
          offset = (ctx.varint)(slot, buffer, offset)
          let old_item = value.old_item
          offset = (ctx.Item)(old_item, buffer, offset)
          let new_item = value.new_item
          offset = (ctx.Item)(new_item, buffer, offset)
          let new_item_stack_id = value.new_item_stack_id
          offset = ((value, buffer, offset) => {
            switch (network_ids) {
              case true: return (ctx.zigzag32)(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(new_item_stack_id, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(inventory_actions, buffer, offset)
      let transaction_data = value.transaction_data
      offset = ((value, buffer, offset) => {
        switch (transaction_type) {
          case "normal": return (ctx.void)(value, buffer, offset)
          case "inventory_mismatch": return (ctx.void)(value, buffer, offset)
          case "item_use": return ((value, buffer, offset) => {
            let action_type = value.action_type
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({"click_block":0,"click_air":1,"break_block":2}[value] || value, buffer, offset)
            })(action_type, buffer, offset)
            let block_position = value.block_position
            offset = (ctx.BlockCoordinates)(block_position, buffer, offset)
            let face = value.face
            offset = (ctx.varint)(face, buffer, offset)
            let hotbar_slot = value.hotbar_slot
            offset = (ctx.varint)(hotbar_slot, buffer, offset)
            let held_item = value.held_item
            offset = (ctx.Item)(held_item, buffer, offset)
            let player_pos = value.player_pos
            offset = (ctx.vec3f)(player_pos, buffer, offset)
            let click_pos = value.click_pos
            offset = (ctx.vec3f)(click_pos, buffer, offset)
            let block_runtime_id = value.block_runtime_id
            offset = (ctx.varint)(block_runtime_id, buffer, offset)
            return offset
          })(value, buffer, offset)
          case "item_use_on_entity": return ((value, buffer, offset) => {
            let entity_runtime_id = value.entity_runtime_id
            offset = (ctx.varint64)(entity_runtime_id, buffer, offset)
            let action_type = value.action_type
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({"interact":0,"attack":1}[value] || value, buffer, offset)
            })(action_type, buffer, offset)
            let hotbar_slot = value.hotbar_slot
            offset = (ctx.zigzag32)(hotbar_slot, buffer, offset)
            let held_item = value.held_item
            offset = (ctx.Item)(held_item, buffer, offset)
            let player_pos = value.player_pos
            offset = (ctx.vec3f)(player_pos, buffer, offset)
            let click_pos = value.click_pos
            offset = (ctx.vec3f)(click_pos, buffer, offset)
            return offset
          })(value, buffer, offset)
          case "item_release": return ((value, buffer, offset) => {
            let action_type = value.action_type
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({"release":0,"consume":1}[value] || value, buffer, offset)
            })(action_type, buffer, offset)
            let hotbar_slot = value.hotbar_slot
            offset = (ctx.zigzag32)(hotbar_slot, buffer, offset)
            let held_item = value.held_item
            offset = (ctx.Item)(held_item, buffer, offset)
            let head_pos = value.head_pos
            offset = (ctx.vec3f)(head_pos, buffer, offset)
            return offset
          })(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(transaction_data, buffer, offset)
      return offset
    },
    ItemStack: (value, buffer, offset) => {
      let runtime_id = value.runtime_id
      offset = (ctx.zigzag32)(runtime_id, buffer, offset)
      let item = value.item
      offset = (ctx.Item)(item, buffer, offset)
      return offset
    },
    ItemStacks: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = (ctx.ItemStack)(value[i], buffer, offset)
      }
      return offset
    },
    RecipeIngredient: (value, buffer, offset) => {
      let network_id = value.network_id
      offset = (ctx.zigzag32)(network_id, buffer, offset)
      let network_data = value.network_data
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return (ctx.zigzag32)(value, buffer, offset)
        }
      })(network_data, buffer, offset)
      let count = value.count
      offset = ((value, buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(value, buffer, offset)
          default: return (ctx.zigzag32)(value, buffer, offset)
        }
      })(count, buffer, offset)
      return offset
    },
    PotionTypeRecipes: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let input_item_id = value.input_item_id
        offset = (ctx.zigzag32)(input_item_id, buffer, offset)
        let input_item_meta = value.input_item_meta
        offset = (ctx.zigzag32)(input_item_meta, buffer, offset)
        let ingredient_id = value.ingredient_id
        offset = (ctx.zigzag32)(ingredient_id, buffer, offset)
        let ingredient_meta = value.ingredient_meta
        offset = (ctx.zigzag32)(ingredient_meta, buffer, offset)
        let output_item_id = value.output_item_id
        offset = (ctx.zigzag32)(output_item_id, buffer, offset)
        let output_item_meta = value.output_item_meta
        offset = (ctx.zigzag32)(output_item_meta, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    PotionContainerChangeRecipes: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let input_item_id = value.input_item_id
        offset = (ctx.zigzag32)(input_item_id, buffer, offset)
        let ingredient_id = value.ingredient_id
        offset = (ctx.zigzag32)(ingredient_id, buffer, offset)
        let output_item_id = value.output_item_id
        offset = (ctx.zigzag32)(output_item_id, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    Recipes: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let type1 = value.type
        offset = ((value, buffer, offset) => {
          return (ctx.zigzag32)({"shapeless":0,"shaped":1,"furnace":2,"furnace_with_metadata":3,"multi":4,"shulker_box":5,"shapeless_chemistry":6,"shaped_chemistry":7}[value] || value, buffer, offset)
        })(type1, buffer, offset)
        let recipe = value.recipe
        offset = ((value, buffer, offset) => {
          switch (type1) {
            case "shapeless": return ((value, buffer, offset) => {
              let recipe_id = value.recipe_id
              offset = (ctx.string)(recipe_id, buffer, offset)
              let input = value.input
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.RecipeIngredient)(value[i], buffer, offset)
                }
                return offset
              })(input, buffer, offset)
              let output = value.output
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.Item)(value[i], buffer, offset)
                }
                return offset
              })(output, buffer, offset)
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              let priority = value.priority
              offset = (ctx.zigzag32)(priority, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "shulker_box": return ((value, buffer, offset) => {
              let recipe_id = value.recipe_id
              offset = (ctx.string)(recipe_id, buffer, offset)
              let input = value.input
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.RecipeIngredient)(value[i], buffer, offset)
                }
                return offset
              })(input, buffer, offset)
              let output = value.output
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.Item)(value[i], buffer, offset)
                }
                return offset
              })(output, buffer, offset)
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              let priority = value.priority
              offset = (ctx.zigzag32)(priority, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "shapeless_chemistry": return ((value, buffer, offset) => {
              let recipe_id = value.recipe_id
              offset = (ctx.string)(recipe_id, buffer, offset)
              let input = value.input
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.RecipeIngredient)(value[i], buffer, offset)
                }
                return offset
              })(input, buffer, offset)
              let output = value.output
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.Item)(value[i], buffer, offset)
                }
                return offset
              })(output, buffer, offset)
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              let priority = value.priority
              offset = (ctx.zigzag32)(priority, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "shaped": return ((value, buffer, offset) => {
              let recipe_id = value.recipe_id
              offset = (ctx.string)(recipe_id, buffer, offset)
              let width = value.width
              offset = (ctx.zigzag32)(width, buffer, offset)
              let height = value.height
              offset = (ctx.zigzag32)(height, buffer, offset)
              let input = value.input
              offset = ((value, buffer, offset) => {
                for (let i = 0; i < value.length; i++) {
                  offset = ((value, buffer, offset) => {
                  for (let i = 0; i < value.length; i++) {
                    offset = (ctx.RecipeIngredient)(value[i], buffer, offset)
                  }
                  return offset
                })(value[i], buffer, offset)
                }
                return offset
              })(input, buffer, offset)
              let output = value.output
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.Item)(value[i], buffer, offset)
                }
                return offset
              })(output, buffer, offset)
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              let priority = value.priority
              offset = (ctx.zigzag32)(priority, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "shaped_chemistry": return ((value, buffer, offset) => {
              let recipe_id = value.recipe_id
              offset = (ctx.string)(recipe_id, buffer, offset)
              let width = value.width
              offset = (ctx.zigzag32)(width, buffer, offset)
              let height = value.height
              offset = (ctx.zigzag32)(height, buffer, offset)
              let input = value.input
              offset = ((value, buffer, offset) => {
                for (let i = 0; i < value.length; i++) {
                  offset = ((value, buffer, offset) => {
                  for (let i = 0; i < value.length; i++) {
                    offset = (ctx.RecipeIngredient)(value[i], buffer, offset)
                  }
                  return offset
                })(value[i], buffer, offset)
                }
                return offset
              })(input, buffer, offset)
              let output = value.output
              offset = ((value, buffer, offset) => {
                offset = (ctx.varint)(value.length, buffer, offset)
                for (let i = 0; i < value.length; i++) {
                  offset = (ctx.Item)(value[i], buffer, offset)
                }
                return offset
              })(output, buffer, offset)
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              let priority = value.priority
              offset = (ctx.zigzag32)(priority, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "furnace": return ((value, buffer, offset) => {
              let input_id = value.input_id
              offset = (ctx.zigzag32)(input_id, buffer, offset)
              let output = value.output
              offset = (ctx.Item)(output, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "furnace_with_metadata": return ((value, buffer, offset) => {
              let input_id = value.input_id
              offset = (ctx.zigzag32)(input_id, buffer, offset)
              let input_meta = value.input_meta
              offset = (ctx.zigzag32)(input_meta, buffer, offset)
              let output = value.output
              offset = (ctx.Item)(output, buffer, offset)
              let block = value.block
              offset = (ctx.string)(block, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "multi": return ((value, buffer, offset) => {
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let network_id1 = value.network_id
              offset = (ctx.zigzag32)(network_id1, buffer, offset)
              return offset
            })(value, buffer, offset)
            default: return (ctx.void)(value, buffer, offset)
          }
        })(recipe, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    SkinImage: (value, buffer, offset) => {
      let width = value.width
      offset = (ctx.li32)(width, buffer, offset)
      let height = value.height
      offset = (ctx.li32)(height, buffer, offset)
      let data = value.data
      offset = (ctx.string)(data, buffer, offset)
      return offset
    },
    Skin: (value, buffer, offset) => {
      let skin_id = value.skin_id
      offset = (ctx.string)(skin_id, buffer, offset)
      let skin_resource_pack = value.skin_resource_pack
      offset = (ctx.string)(skin_resource_pack, buffer, offset)
      let skin_data = value.skin_data
      offset = (ctx.SkinImage)(skin_data, buffer, offset)
      let animations = value.animations
      offset = ((value, buffer, offset) => {
        offset = (ctx.li32)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let skin_image = value.skin_image
          offset = (ctx.SkinImage)(skin_image, buffer, offset)
          let animation_type = value.animation_type
          offset = (ctx.li32)(animation_type, buffer, offset)
          let animation_frames = value.animation_frames
          offset = (ctx.lf32)(animation_frames, buffer, offset)
          let expression_type = value.expression_type
          offset = (ctx.lf32)(expression_type, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(animations, buffer, offset)
      let cape_data = value.cape_data
      offset = (ctx.SkinImage)(cape_data, buffer, offset)
      let geometry_data = value.geometry_data
      offset = (ctx.string)(geometry_data, buffer, offset)
      let animation_data = value.animation_data
      offset = (ctx.string)(animation_data, buffer, offset)
      let premium = value.premium
      offset = (ctx.string)(premium, buffer, offset)
      let persona = value.persona
      offset = (ctx.bool)(persona, buffer, offset)
      let cape_on_classic = value.cape_on_classic
      offset = (ctx.bool)(cape_on_classic, buffer, offset)
      let cape_id = value.cape_id
      offset = (ctx.string)(cape_id, buffer, offset)
      let full_skin_id = value.full_skin_id
      offset = (ctx.string)(full_skin_id, buffer, offset)
      let arm_size = value.arm_size
      offset = (ctx.string)(arm_size, buffer, offset)
      let skin_color = value.skin_color
      offset = (ctx.string)(skin_color, buffer, offset)
      let personal_pieces = value.personal_pieces
      offset = ((value, buffer, offset) => {
        offset = (ctx.li32)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let piece_id = value.piece_id
          offset = (ctx.string)(piece_id, buffer, offset)
          let piece_type = value.piece_type
          offset = (ctx.string)(piece_type, buffer, offset)
          let pack_id = value.pack_id
          offset = (ctx.string)(pack_id, buffer, offset)
          let is_default_piece = value.is_default_piece
          offset = (ctx.bool)(is_default_piece, buffer, offset)
          let product_id = value.product_id
          offset = (ctx.string)(product_id, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(personal_pieces, buffer, offset)
      let piece_tint_colors = value.piece_tint_colors
      offset = ((value, buffer, offset) => {
        offset = (ctx.li32)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let piece_type = value.piece_type
          offset = (ctx.string)(piece_type, buffer, offset)
          let colors = value.colors
          offset = ((value, buffer, offset) => {
            offset = (ctx.li32)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(colors, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(piece_tint_colors, buffer, offset)
      return offset
    },
    PlayerRecords: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"add":0,"remove":1}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let records_count = value.records_count
      offset = (ctx.varint)(records_count, buffer, offset)
      let records = value.records
      offset = ((value, buffer, offset) => {
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          switch (type) {
            case "add": return ((value, buffer, offset) => {
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              let entity_unique_id = value.entity_unique_id
              offset = (ctx.zigzag64)(entity_unique_id, buffer, offset)
              let username = value.username
              offset = (ctx.string)(username, buffer, offset)
              let xbox_user_id = value.xbox_user_id
              offset = (ctx.string)(xbox_user_id, buffer, offset)
              let platform_chat_id = value.platform_chat_id
              offset = (ctx.string)(platform_chat_id, buffer, offset)
              let build_platform = value.build_platform
              offset = (ctx.li32)(build_platform, buffer, offset)
              let skin_data1 = value.skin_data
              offset = (ctx.Skin)(skin_data1, buffer, offset)
              let is_teacher = value.is_teacher
              offset = (ctx.bool)(is_teacher, buffer, offset)
              let is_host = value.is_host
              offset = (ctx.bool)(is_host, buffer, offset)
              return offset
            })(value, buffer, offset)
            case "remove": return ((value, buffer, offset) => {
              let uuid = value.uuid
              offset = (ctx.uuid)(uuid, buffer, offset)
              return offset
            })(value, buffer, offset)
            default: return (ctx.void)(value, buffer, offset)
          }
        })(value[i], buffer, offset)
        }
        return offset
      })(records, buffer, offset)
      let verified = value.verified
      offset = ((value, buffer, offset) => {
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.bool)(value[i], buffer, offset)
        }
        return offset
      })(verified, buffer, offset)
      return offset
    },
    ScoreEntries: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"change":0,"remove":1}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let entries = value.entries
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let scoreboard_id = value.scoreboard_id
          offset = (ctx.zigzag64)(scoreboard_id, buffer, offset)
          let objective_name = value.objective_name
          offset = (ctx.string)(objective_name, buffer, offset)
          let score = value.score
          offset = (ctx.li32)(score, buffer, offset)
          let entry_type = value.entry_type
          offset = ((value, buffer, offset) => {
            switch (type1) {
              case "remove": return ((value, buffer, offset) => {
                return (ctx.i8)({"player":1,"entity":2,"fake_player":3}[value] || value, buffer, offset)
              })(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(entry_type, buffer, offset)
          let entity_unique_id = value.entity_unique_id
          offset = ((value, buffer, offset) => {
            switch (type1) {
              case "remove": return ((value, buffer, offset) => {
                switch (entry_type) {
                  case "player": return (ctx.zigzag64)(value, buffer, offset)
                  case "entity": return (ctx.zigzag64)(value, buffer, offset)
                  default: return (ctx.void)(value, buffer, offset)
                }
              })(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(entity_unique_id, buffer, offset)
          let custom_name = value.custom_name
          offset = ((value, buffer, offset) => {
            switch (type1) {
              case "remove": return ((value, buffer, offset) => {
                switch (entry_type) {
                  case "fake_player": return (ctx.string)(value, buffer, offset)
                  default: return (ctx.void)(value, buffer, offset)
                }
              })(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(custom_name, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(entries, buffer, offset)
      return offset
    },
    ScoreboardIdentityEntries: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.i8)({"TYPE_REGISTER_IDENTITY":0,"TYPE_CLEAR_IDENTITY":1}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let entries = value.entries
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let scoreboard_id = value.scoreboard_id
          offset = (ctx.zigzag64)(scoreboard_id, buffer, offset)
          let entity_unique_id = value.entity_unique_id
          offset = ((value, buffer, offset) => {
            switch (type1) {
              case "TYPE_REGISTER_IDENTITY": return (ctx.zigzag64)(value, buffer, offset)
              default: return (ctx.void)(value, buffer, offset)
            }
          })(entity_unique_id, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(entries, buffer, offset)
      return offset
    },
    Enchant: (value, buffer, offset) => {
      let id = value.id
      offset = (ctx.u8)(id, buffer, offset)
      let level = value.level
      offset = (ctx.u8)(level, buffer, offset)
      return offset
    },
    EnchantOptions: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let cost = value.cost
        offset = (ctx.varint)(cost, buffer, offset)
        let slot_flags = value.slot_flags
        offset = (ctx.li32)(slot_flags, buffer, offset)
        let equip_enchants = value.equip_enchants
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = (ctx.Enchant)(value[i], buffer, offset)
          }
          return offset
        })(equip_enchants, buffer, offset)
        let held_enchants = value.held_enchants
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = (ctx.Enchant)(value[i], buffer, offset)
          }
          return offset
        })(held_enchants, buffer, offset)
        let self_enchants = value.self_enchants
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = (ctx.Enchant)(value[i], buffer, offset)
          }
          return offset
        })(self_enchants, buffer, offset)
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        let option_id = value.option_id
        offset = (ctx.zigzag32)(option_id, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    StackRequestSlotInfo: (value, buffer, offset) => {
      let container_id = value.container_id
      offset = (ctx.u8)(container_id, buffer, offset)
      let slot_id = value.slot_id
      offset = (ctx.u8)(slot_id, buffer, offset)
      let stack_id = value.stack_id
      offset = (ctx.zigzag32)(stack_id, buffer, offset)
      return offset
    },
    ItemStackRequests: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let request_id = value.request_id
        offset = (ctx.zigzag32)(request_id, buffer, offset)
        let actions = value.actions
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = ((value, buffer, offset) => {
            let type_id = value.type_id
            offset = ((value, buffer, offset) => {
              return (ctx.u8)({"take":0,"place":1,"swap":2,"drop":3,"destroy":4,"consume":5,"create":6,"lab_table_combine":7,"beacon_payment":8,"craft_recipe":9,"craft_recipe_auto":10,"craft_creative":11,"optional":12,"non_implemented":13,"results_deprecated":14}[value] || value, buffer, offset)
            })(type_id, buffer, offset)
            let count1 = value.count
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.u8)(value, buffer, offset)
                case "place": return (ctx.u8)(value, buffer, offset)
                case "drop": return (ctx.u8)(value, buffer, offset)
                case "destroy": return (ctx.u8)(value, buffer, offset)
                case "consume": return (ctx.u8)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(count1, buffer, offset)
            let source = value.source
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "place": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "swap": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "drop": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "destroy": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "consume": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(source, buffer, offset)
            let destination = value.destination
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "place": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "swap": return (ctx.StackRequestSlotInfo)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(destination, buffer, offset)
            let randomly = value.randomly
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "drop": return (ctx.bool)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(randomly, buffer, offset)
            let result_slot_id = value.result_slot_id
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "create": return (ctx.u8)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(result_slot_id, buffer, offset)
            let primary_effect = value.primary_effect
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "beacon_payment": return (ctx.zigzag32)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(primary_effect, buffer, offset)
            let secondary_effect = value.secondary_effect
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "beacon_payment": return (ctx.zigzag32)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(secondary_effect, buffer, offset)
            let recipe_network_id = value.recipe_network_id
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "craft_recipe": return (ctx.varint)(value, buffer, offset)
                case "craft_recipe_auto": return (ctx.varint)(value, buffer, offset)
                case "optional": return (ctx.varint)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(recipe_network_id, buffer, offset)
            let creative_item_network_id = value.creative_item_network_id
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "craft_creative": return (ctx.varint32)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(creative_item_network_id, buffer, offset)
            let filtered_string_index = value.filtered_string_index
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "optional": return (ctx.li32)(value, buffer, offset)
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(filtered_string_index, buffer, offset)
            let result_items = value.result_items
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                case "results_deprecated": return ((value, buffer, offset) => {
                  offset = (ctx.varint)(value.length, buffer, offset)
                  for (let i = 0; i < value.length; i++) {
                    offset = (ctx.Item)(value[i], buffer, offset)
                  }
                  return offset
                })(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(result_items, buffer, offset)
            let times_crafted = value.times_crafted
            offset = ((value, buffer, offset) => {
              switch (type_id) {
                case "non_implemented": return (ctx.void)(value, buffer, offset)
                case "results_deprecated": return (ctx.u8)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(times_crafted, buffer, offset)
            return offset
          })(value[i], buffer, offset)
          }
          return offset
        })(actions, buffer, offset)
        let custom_names = value.custom_names
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = (ctx.string)(value[i], buffer, offset)
          }
          return offset
        })(custom_names, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    ItemStackResponses: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let result = value.result
        offset = (ctx.u8)(result, buffer, offset)
        let request_id = value.request_id
        offset = (ctx.varint32)(request_id, buffer, offset)
        let containers = value.containers
        offset = ((value, buffer, offset) => {
          offset = (ctx.varint)(value.length, buffer, offset)
          for (let i = 0; i < value.length; i++) {
            offset = ((value, buffer, offset) => {
            let container_id1 = value.container_id
            offset = (ctx.u8)(container_id1, buffer, offset)
            let slots = value.slots
            offset = ((value, buffer, offset) => {
              offset = (ctx.varint)(value.length, buffer, offset)
              for (let i = 0; i < value.length; i++) {
                offset = ((value, buffer, offset) => {
                let slot = value.slot
                offset = (ctx.u8)(slot, buffer, offset)
                let hotbar_slot = value.hotbar_slot
                offset = (ctx.u8)(hotbar_slot, buffer, offset)
                let count1 = value.count
                offset = (ctx.u8)(count1, buffer, offset)
                let item_stack_id = value.item_stack_id
                offset = (ctx.varint32)(item_stack_id, buffer, offset)
                let custom_name = value.custom_name
                offset = (ctx.string)(custom_name, buffer, offset)
                return offset
              })(value[i], buffer, offset)
              }
              return offset
            })(slots, buffer, offset)
            return offset
          })(value[i], buffer, offset)
          }
          return offset
        })(containers, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    ItemComponentList: (value, buffer, offset) => {
      offset = (ctx.varint)(value.length, buffer, offset)
      for (let i = 0; i < value.length; i++) {
        offset = ((value, buffer, offset) => {
        let name1 = value.name
        offset = (ctx.string)(name1, buffer, offset)
        let nbt1 = value.nbt
        offset = (ctx.nbt)(nbt1, buffer, offset)
        return offset
      })(value[i], buffer, offset)
      }
      return offset
    },
    CommandOrigin: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"player":0,"block":1,"minecart_block":2,"dev_console":3,"test":4,"automation_player":5,"client_automation":6,"dedicated_server":7,"entity":8,"virtual":9,"game_argument":10,"entity_server":11}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let uuid = value.uuid
      offset = (ctx.uuid)(uuid, buffer, offset)
      let request_id = value.request_id
      offset = (ctx.string)(request_id, buffer, offset)
      let player_entity_id = value.player_entity_id
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "dev_console": return ((value, buffer, offset) => {
            let player_entity_id1 = value.player_entity_id
            offset = (ctx.zigzag64)(player_entity_id1, buffer, offset)
            return offset
          })(value, buffer, offset)
          case "test": return ((value, buffer, offset) => {
            let player_entity_id1 = value.player_entity_id
            offset = (ctx.zigzag64)(player_entity_id1, buffer, offset)
            return offset
          })(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(player_entity_id, buffer, offset)
      return offset
    },
    WindowID: (value, buffer, offset) => {
      return (ctx.i8)({"inventory":0,"first":1,"last":100,"offhand":119,"armor":120,"creative":121,"hotbar":122,"fixed_inventory":123,"ui":124,"drop_contents":-100,"beacon":-24,"trading_output":-23,"trading_use_inputs":-22,"trading_input_2":-21,"trading_input_1":-20,"enchant_output":-17,"enchant_material":-16,"enchant_input":-15,"anvil_output":-13,"anvil_result":-12,"anvil_material":-11,"container_input":-10,"crafting_use_ingredient":-5,"crafting_result":-4,"crafting_remove_ingredient":-3,"crafting_add_ingredient":-2,"none":-1}[value] || value, buffer, offset)
    },
    WindowType: (value, buffer, offset) => {
      return (ctx.u8)({"container":0,"workbench":1,"furnace":2,"enchantment":3,"brewing_stand":4,"anvil":5,"dispenser":6,"dropper":7,"hopper":8,"cauldron":9,"minecart_chest":10,"minecart_hopper":11,"horse":12,"beacon":13,"structure_editor":14,"trading":15,"command_block":16,"jukebox":17,"armor":18,"hand":19,"compound_creator":20,"element_constructor":21,"material_reducer":22,"lab_table":23,"loom":24,"lectern":25,"grindstone":26,"blast_furnace":27,"smoker":28,"stonecutter":29,"cartography":30,"hud":31,"jigsaw_editor":32,"smithing_table":33}[value] || value, buffer, offset)
    },
    LegacyEntityType: (value, buffer, offset) => {
      return (ctx.li32)({"chicken":10,"cow":11,"pig":12,"sheep":13,"wolf":14,"villager":15,"mooshroom":16,"squid":17,"rabbit":18,"bat":19,"iron_golem":20,"snow_golem":21,"ocelot":22,"horse":23,"donkey":24,"mule":25,"skeleton_horse":26,"zombie_horse":27,"polar_bear":28,"llama":29,"parrot":30,"dolphin":31,"zombie":32,"creeper":33,"skeleton":34,"spider":35,"zombie_pigman":36,"slime":37,"enderman":38,"silverfish":39,"cave_spider":40,"ghast":41,"magma_cube":42,"blaze":43,"zombie_villager":44,"witch":45,"stray":46,"husk":47,"wither_skeleton":48,"guardian":49,"elder_guardian":50,"npc":51,"wither":52,"ender_dragon":53,"shulker":54,"endermite":55,"agent":56,"vindicator":57,"phantom":58,"armor_stand":61,"tripod_camera":62,"player":63,"item":64,"tnt":65,"falling_block":66,"moving_block":67,"xp_bottle":68,"xp_orb":69,"eye_of_ender_signal":70,"ender_crystal":71,"fireworks_rocket":72,"thrown_trident":73,"turtle":74,"cat":75,"shulker_bullet":76,"fishing_hook":77,"chalkboard":78,"dragon_fireball":79,"arrow":80,"snowball":81,"egg":82,"painting":83,"minecart":84,"fireball":85,"splash_potion":86,"ender_pearl":87,"leash_knot":88,"wither_skull":89,"boat":90,"wither_skull_dangerous":91,"lightning_bolt":93,"small_fireball":94,"area_effect_cloud":95,"hopper_minecart":96,"tnt_minecart":97,"chest_minecart":98,"command_block_minecart":100,"lingering_potion":101,"llama_spit":102,"evocation_fang":103,"evocation_illager":104,"vex":105,"ice_bomb":106,"balloon":107,"pufferfish":108,"salmon":109,"drowned":110,"tropicalfish":111,"cod":112,"panda":113}[value] || value, buffer, offset)
    },
    mcpe_packet: (value, buffer, offset) => {
      let name = value.name
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"login":1,"play_status":2,"server_to_client_handshake":3,"client_to_server_handshake":4,"disconnect":5,"resource_packs_info":6,"resource_pack_stack":7,"resource_pack_client_response":8,"text":9,"set_time":10,"start_game":11,"add_player":12,"add_entity":13,"remove_entity":14,"add_item_entity":15,"take_item_entity":17,"move_entity":18,"move_player":19,"rider_jump":20,"update_block":21,"add_painting":22,"tick_sync":23,"level_sound_event_old":24,"level_event":25,"block_event":26,"entity_event":27,"mob_effect":28,"update_attributes":29,"inventory_transaction":30,"mob_equipment":31,"mob_armor_equipment":32,"interact":33,"block_pick_request":34,"entity_pick_request":35,"player_action":36,"hurt_armor":38,"set_entity_data":39,"set_entity_motion":40,"set_entity_link":41,"set_health":42,"set_spawn_position":43,"animate":44,"respawn":45,"container_open":46,"container_close":47,"player_hotbar":48,"inventory_content":49,"inventory_slot":50,"container_set_data":51,"crafting_data":52,"crafting_event":53,"gui_data_pick_item":54,"adventure_settings":55,"block_entity_data":56,"player_input":57,"level_chunk":58,"set_commands_enabled":59,"set_difficulty":60,"change_dimension":61,"set_player_game_type":62,"player_list":63,"simple_event":64,"event":65,"spawn_experience_orb":66,"clientbound_map_item_data":67,"map_info_request":68,"request_chunk_radius":69,"chunk_radius_update":70,"item_frame_drop_item":71,"game_rules_changed":72,"camera":73,"boss_event":74,"show_credits":75,"available_commands":76,"command_request":77,"command_block_update":78,"command_output":79,"update_trade":80,"update_equipment":81,"resource_pack_data_info":82,"resource_pack_chunk_data":83,"resource_pack_chunk_request":84,"transfer":85,"play_sound":86,"stop_sound":87,"set_title":88,"add_behavior_tree":89,"structure_block_update":90,"show_store_offer":91,"purchase_receipt":92,"player_skin":93,"sub_client_login":94,"initiate_web_socket_connection":95,"set_last_hurt_by":96,"book_edit":97,"npc_request":98,"photo_transfer":99,"modal_form_request":100,"modal_form_response":101,"server_settings_request":102,"server_settings_response":103,"show_profile":104,"set_default_game_type":105,"remove_objective":106,"set_display_objective":107,"set_score":108,"lab_table":109,"update_block_synced":110,"move_entity_delta":111,"set_scoreboard_identity":112,"set_local_player_as_initialized":113,"update_soft_enum":114,"network_stack_latency":115,"script_custom_event":117,"spawn_particle_effect":118,"available_entity_identifiers":119,"level_sound_event_v2":120,"network_chunk_publisher_update":121,"biome_definition_list":122,"level_sound_event":123,"level_event_generic":124,"lectern_update":125,"video_stream_connect":126,"add_ecs_entity":127,"remove_ecs_entity":128,"client_cache_status":129,"on_screen_texture_animation":130,"map_create_locked_copy":131,"structure_template_data_export_request":132,"structure_template_data_export_response":133,"update_block_properties":134,"client_cache_blob_status":135,"client_cache_miss_response":136,"education_settings":137,"multiplayer_settings":139,"settings_command":140,"anvil_damage":141,"completed_using_item":142,"network_settings":143,"player_auth_input":144,"creative_content":145,"player_enchant_options":146,"item_stack_request":147,"item_stack_response":148,"player_armor_damage":149,"update_player_game_type":151,"position_tracking_db_broadcast":153,"position_tracking_db_request":154,"packet_violation_warning":156,"motion_prediction_hints":157,"animate_entity":158,"camera_shake":159,"player_fog":160,"correct_player_move_prediction":161,"item_component":162,"filter_text_packet":163}[value] || value, buffer, offset)
      })(name, buffer, offset)
      let params = value.params
      offset = ((value, buffer, offset) => {
        switch (name) {
          case "login": return (ctx.packet_login)(value, buffer, offset)
          case "play_status": return (ctx.packet_play_status)(value, buffer, offset)
          case "server_to_client_handshake": return (ctx.packet_server_to_client_handshake)(value, buffer, offset)
          case "client_to_server_handshake": return (ctx.packet_client_to_server_handshake)(value, buffer, offset)
          case "disconnect": return (ctx.packet_disconnect)(value, buffer, offset)
          case "resource_packs_info": return (ctx.packet_resource_packs_info)(value, buffer, offset)
          case "resource_pack_stack": return (ctx.packet_resource_pack_stack)(value, buffer, offset)
          case "resource_pack_client_response": return (ctx.packet_resource_pack_client_response)(value, buffer, offset)
          case "text": return (ctx.packet_text)(value, buffer, offset)
          case "set_time": return (ctx.packet_set_time)(value, buffer, offset)
          case "start_game": return (ctx.packet_start_game)(value, buffer, offset)
          case "add_player": return (ctx.packet_add_player)(value, buffer, offset)
          case "add_entity": return (ctx.packet_add_entity)(value, buffer, offset)
          case "remove_entity": return (ctx.packet_remove_entity)(value, buffer, offset)
          case "add_item_entity": return (ctx.packet_add_item_entity)(value, buffer, offset)
          case "take_item_entity": return (ctx.packet_take_item_entity)(value, buffer, offset)
          case "move_entity": return (ctx.packet_move_entity)(value, buffer, offset)
          case "move_player": return (ctx.packet_move_player)(value, buffer, offset)
          case "rider_jump": return (ctx.packet_rider_jump)(value, buffer, offset)
          case "update_block": return (ctx.packet_update_block)(value, buffer, offset)
          case "add_painting": return (ctx.packet_add_painting)(value, buffer, offset)
          case "tick_sync": return (ctx.packet_tick_sync)(value, buffer, offset)
          case "level_sound_event_old": return (ctx.packet_level_sound_event_old)(value, buffer, offset)
          case "level_event": return (ctx.packet_level_event)(value, buffer, offset)
          case "block_event": return (ctx.packet_block_event)(value, buffer, offset)
          case "entity_event": return (ctx.packet_entity_event)(value, buffer, offset)
          case "mob_effect": return (ctx.packet_mob_effect)(value, buffer, offset)
          case "update_attributes": return (ctx.packet_update_attributes)(value, buffer, offset)
          case "inventory_transaction": return (ctx.packet_inventory_transaction)(value, buffer, offset)
          case "mob_equipment": return (ctx.packet_mob_equipment)(value, buffer, offset)
          case "mob_armor_equipment": return (ctx.packet_mob_armor_equipment)(value, buffer, offset)
          case "interact": return (ctx.packet_interact)(value, buffer, offset)
          case "block_pick_request": return (ctx.packet_block_pick_request)(value, buffer, offset)
          case "entity_pick_request": return (ctx.packet_entity_pick_request)(value, buffer, offset)
          case "player_action": return (ctx.packet_player_action)(value, buffer, offset)
          case "hurt_armor": return (ctx.packet_hurt_armor)(value, buffer, offset)
          case "set_entity_data": return (ctx.packet_set_entity_data)(value, buffer, offset)
          case "set_entity_motion": return (ctx.packet_set_entity_motion)(value, buffer, offset)
          case "set_entity_link": return (ctx.packet_set_entity_link)(value, buffer, offset)
          case "set_health": return (ctx.packet_set_health)(value, buffer, offset)
          case "set_spawn_position": return (ctx.packet_set_spawn_position)(value, buffer, offset)
          case "animate": return (ctx.packet_animate)(value, buffer, offset)
          case "respawn": return (ctx.packet_respawn)(value, buffer, offset)
          case "container_open": return (ctx.packet_container_open)(value, buffer, offset)
          case "container_close": return (ctx.packet_container_close)(value, buffer, offset)
          case "player_hotbar": return (ctx.packet_player_hotbar)(value, buffer, offset)
          case "inventory_content": return (ctx.packet_inventory_content)(value, buffer, offset)
          case "inventory_slot": return (ctx.packet_inventory_slot)(value, buffer, offset)
          case "container_set_data": return (ctx.packet_container_set_data)(value, buffer, offset)
          case "crafting_data": return (ctx.packet_crafting_data)(value, buffer, offset)
          case "crafting_event": return (ctx.packet_crafting_event)(value, buffer, offset)
          case "gui_data_pick_item": return (ctx.packet_gui_data_pick_item)(value, buffer, offset)
          case "adventure_settings": return (ctx.packet_adventure_settings)(value, buffer, offset)
          case "block_entity_data": return (ctx.packet_block_entity_data)(value, buffer, offset)
          case "player_input": return (ctx.packet_player_input)(value, buffer, offset)
          case "level_chunk": return (ctx.packet_level_chunk)(value, buffer, offset)
          case "set_commands_enabled": return (ctx.packet_set_commands_enabled)(value, buffer, offset)
          case "set_difficulty": return (ctx.packet_set_difficulty)(value, buffer, offset)
          case "change_dimension": return (ctx.packet_change_dimension)(value, buffer, offset)
          case "set_player_game_type": return (ctx.packet_set_player_game_type)(value, buffer, offset)
          case "player_list": return (ctx.packet_player_list)(value, buffer, offset)
          case "simple_event": return (ctx.packet_simple_event)(value, buffer, offset)
          case "event": return (ctx.packet_event)(value, buffer, offset)
          case "spawn_experience_orb": return (ctx.packet_spawn_experience_orb)(value, buffer, offset)
          case "clientbound_map_item_data": return (ctx.packet_clientbound_map_item_data)(value, buffer, offset)
          case "map_info_request": return (ctx.packet_map_info_request)(value, buffer, offset)
          case "request_chunk_radius": return (ctx.packet_request_chunk_radius)(value, buffer, offset)
          case "chunk_radius_update": return (ctx.packet_chunk_radius_update)(value, buffer, offset)
          case "item_frame_drop_item": return (ctx.packet_item_frame_drop_item)(value, buffer, offset)
          case "game_rules_changed": return (ctx.packet_game_rules_changed)(value, buffer, offset)
          case "camera": return (ctx.packet_camera)(value, buffer, offset)
          case "boss_event": return (ctx.packet_boss_event)(value, buffer, offset)
          case "show_credits": return (ctx.packet_show_credits)(value, buffer, offset)
          case "available_commands": return (ctx.packet_available_commands)(value, buffer, offset)
          case "command_request": return (ctx.packet_command_request)(value, buffer, offset)
          case "command_block_update": return (ctx.packet_command_block_update)(value, buffer, offset)
          case "command_output": return (ctx.packet_command_output)(value, buffer, offset)
          case "update_trade": return (ctx.packet_update_trade)(value, buffer, offset)
          case "update_equipment": return (ctx.packet_update_equipment)(value, buffer, offset)
          case "resource_pack_data_info": return (ctx.packet_resource_pack_data_info)(value, buffer, offset)
          case "resource_pack_chunk_data": return (ctx.packet_resource_pack_chunk_data)(value, buffer, offset)
          case "resource_pack_chunk_request": return (ctx.packet_resource_pack_chunk_request)(value, buffer, offset)
          case "transfer": return (ctx.packet_transfer)(value, buffer, offset)
          case "play_sound": return (ctx.packet_play_sound)(value, buffer, offset)
          case "stop_sound": return (ctx.packet_stop_sound)(value, buffer, offset)
          case "set_title": return (ctx.packet_set_title)(value, buffer, offset)
          case "add_behavior_tree": return (ctx.packet_add_behavior_tree)(value, buffer, offset)
          case "structure_block_update": return (ctx.packet_structure_block_update)(value, buffer, offset)
          case "show_store_offer": return (ctx.packet_show_store_offer)(value, buffer, offset)
          case "purchase_receipt": return (ctx.packet_purchase_receipt)(value, buffer, offset)
          case "player_skin": return (ctx.packet_player_skin)(value, buffer, offset)
          case "sub_client_login": return (ctx.packet_sub_client_login)(value, buffer, offset)
          case "initiate_web_socket_connection": return (ctx.packet_initiate_web_socket_connection)(value, buffer, offset)
          case "set_last_hurt_by": return (ctx.packet_set_last_hurt_by)(value, buffer, offset)
          case "book_edit": return (ctx.packet_book_edit)(value, buffer, offset)
          case "npc_request": return (ctx.packet_npc_request)(value, buffer, offset)
          case "photo_transfer": return (ctx.packet_photo_transfer)(value, buffer, offset)
          case "modal_form_request": return (ctx.packet_modal_form_request)(value, buffer, offset)
          case "modal_form_response": return (ctx.packet_modal_form_response)(value, buffer, offset)
          case "server_settings_request": return (ctx.packet_server_settings_request)(value, buffer, offset)
          case "server_settings_response": return (ctx.packet_server_settings_response)(value, buffer, offset)
          case "show_profile": return (ctx.packet_show_profile)(value, buffer, offset)
          case "set_default_game_type": return (ctx.packet_set_default_game_type)(value, buffer, offset)
          case "remove_objective": return (ctx.packet_remove_objective)(value, buffer, offset)
          case "set_display_objective": return (ctx.packet_set_display_objective)(value, buffer, offset)
          case "set_score": return (ctx.packet_set_score)(value, buffer, offset)
          case "lab_table": return (ctx.packet_lab_table)(value, buffer, offset)
          case "update_block_synced": return (ctx.packet_update_block_synced)(value, buffer, offset)
          case "move_entity_delta": return (ctx.packet_move_entity_delta)(value, buffer, offset)
          case "set_scoreboard_identity": return (ctx.packet_set_scoreboard_identity)(value, buffer, offset)
          case "set_local_player_as_initialized": return (ctx.packet_set_local_player_as_initialized)(value, buffer, offset)
          case "update_soft_enum": return (ctx.packet_update_soft_enum)(value, buffer, offset)
          case "network_stack_latency": return (ctx.packet_network_stack_latency)(value, buffer, offset)
          case "script_custom_event": return (ctx.packet_script_custom_event)(value, buffer, offset)
          case "spawn_particle_effect": return (ctx.packet_spawn_particle_effect)(value, buffer, offset)
          case "available_entity_identifiers": return (ctx.packet_available_entity_identifiers)(value, buffer, offset)
          case "level_sound_event_v2": return (ctx.packet_level_sound_event_v2)(value, buffer, offset)
          case "network_chunk_publisher_update": return (ctx.packet_network_chunk_publisher_update)(value, buffer, offset)
          case "biome_definition_list": return (ctx.packet_biome_definition_list)(value, buffer, offset)
          case "level_sound_event": return (ctx.packet_level_sound_event)(value, buffer, offset)
          case "level_event_generic": return (ctx.packet_level_event_generic)(value, buffer, offset)
          case "lectern_update": return (ctx.packet_lectern_update)(value, buffer, offset)
          case "video_stream_connect": return (ctx.packet_video_stream_connect)(value, buffer, offset)
          case "add_ecs_entity": return (ctx.packet_add_ecs_entity)(value, buffer, offset)
          case "remove_ecs_entity": return (ctx.packet_remove_ecs_entity)(value, buffer, offset)
          case "client_cache_status": return (ctx.packet_client_cache_status)(value, buffer, offset)
          case "on_screen_texture_animation": return (ctx.packet_on_screen_texture_animation)(value, buffer, offset)
          case "map_create_locked_copy": return (ctx.packet_map_create_locked_copy)(value, buffer, offset)
          case "structure_template_data_export_request": return (ctx.packet_structure_template_data_export_request)(value, buffer, offset)
          case "structure_template_data_export_response": return (ctx.packet_structure_template_data_export_response)(value, buffer, offset)
          case "update_block_properties": return (ctx.packet_update_block_properties)(value, buffer, offset)
          case "client_cache_blob_status": return (ctx.packet_client_cache_blob_status)(value, buffer, offset)
          case "client_cache_miss_response": return (ctx.packet_client_cache_miss_response)(value, buffer, offset)
          case "education_settings": return (ctx.packet_education_settings)(value, buffer, offset)
          case "multiplayer_settings": return (ctx.packet_multiplayer_settings)(value, buffer, offset)
          case "settings_command": return (ctx.packet_settings_command)(value, buffer, offset)
          case "anvil_damage": return (ctx.packet_anvil_damage)(value, buffer, offset)
          case "completed_using_item": return (ctx.packet_completed_using_item)(value, buffer, offset)
          case "network_settings": return (ctx.packet_network_settings)(value, buffer, offset)
          case "player_auth_input": return (ctx.packet_player_auth_input)(value, buffer, offset)
          case "creative_content": return (ctx.packet_creative_content)(value, buffer, offset)
          case "player_enchant_options": return (ctx.packet_player_enchant_options)(value, buffer, offset)
          case "item_stack_request": return (ctx.packet_item_stack_request)(value, buffer, offset)
          case "item_stack_response": return (ctx.packet_item_stack_response)(value, buffer, offset)
          case "player_armor_damage": return (ctx.packet_player_armor_damage)(value, buffer, offset)
          case "update_player_game_type": return (ctx.packet_update_player_game_type)(value, buffer, offset)
          case "position_tracking_db_request": return (ctx.packet_position_tracking_db_request)(value, buffer, offset)
          case "position_tracking_db_broadcast": return (ctx.packet_position_tracking_db_broadcast)(value, buffer, offset)
          case "packet_violation_warning": return (ctx.packet_packet_violation_warning)(value, buffer, offset)
          case "motion_prediction_hints": return (ctx.packet_motion_prediction_hints)(value, buffer, offset)
          case "animate_entity": return (ctx.packet_animate_entity)(value, buffer, offset)
          case "camera_shake": return (ctx.packet_camera_shake)(value, buffer, offset)
          case "player_fog": return (ctx.packet_player_fog)(value, buffer, offset)
          case "correct_player_move_prediction": return (ctx.packet_correct_player_move_prediction)(value, buffer, offset)
          case "item_component": return (ctx.packet_item_component)(value, buffer, offset)
          case "filter_text_packet": return (ctx.packet_filter_text_packet)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(params, buffer, offset)
      return offset
    },
    packet_login: (value, buffer, offset) => {
      let protocol_version = value.protocol_version
      offset = (ctx.i32)(protocol_version, buffer, offset)
      let tokens = value.tokens
      offset = ((value, buffer, offset) => {
        const buf = Buffer.allocUnsafe(buffer.length - offset)
          const payloadSize = (ctx.LoginTokens)(value, buf, 0)
          let size = (ctx.varint)(payloadSize, buffer, offset)
          size += buf.copy(buffer, size, 0, payloadSize)
          return size
      })(tokens, buffer, offset)
      return offset
    },
    LoginTokens: (value, buffer, offset) => {
      let identity = value.identity
      offset = (ctx.LittleString)(identity, buffer, offset)
      let client = value.client
      offset = (ctx.LittleString)(client, buffer, offset)
      return offset
    },
    packet_play_status: (value, buffer, offset) => {
      let status = value.status
      offset = ((value, buffer, offset) => {
        return (ctx.i32)({"login_success":0,"failed_client":1,"failed_spawn":2,"player_spawn":3,"failed_invalid_tenant":4,"failed_vanilla_edu":5,"failed_edu_vanilla":6,"failed_server_full":7}[value] || value, buffer, offset)
      })(status, buffer, offset)
      return offset
    },
    packet_server_to_client_handshake: (value, buffer, offset) => {
      let token = value.token
      offset = (ctx.string)(token, buffer, offset)
      return offset
    },
    packet_client_to_server_handshake: (value, buffer, offset) => {
      return offset
    },
    packet_disconnect: (value, buffer, offset) => {
      let hide_disconnect_reason = value.hide_disconnect_reason
      offset = (ctx.bool)(hide_disconnect_reason, buffer, offset)
      let message = value.message
      offset = (ctx.string)(message, buffer, offset)
      return offset
    },
    packet_resource_packs_info: (value, buffer, offset) => {
      let must_accept = value.must_accept
      offset = (ctx.bool)(must_accept, buffer, offset)
      let has_scripts = value.has_scripts
      offset = (ctx.bool)(has_scripts, buffer, offset)
      let behaviour_packs = value.behaviour_packs
      offset = (ctx.BehaviourPackInfos)(behaviour_packs, buffer, offset)
      let texture_packs = value.texture_packs
      offset = (ctx.TexturePackInfos)(texture_packs, buffer, offset)
      return offset
    },
    packet_resource_pack_stack: (value, buffer, offset) => {
      let must_accept = value.must_accept
      offset = (ctx.bool)(must_accept, buffer, offset)
      let behavior_packs = value.behavior_packs
      offset = (ctx.ResourcePackIdVersions)(behavior_packs, buffer, offset)
      let resource_packs = value.resource_packs
      offset = (ctx.ResourcePackIdVersions)(resource_packs, buffer, offset)
      let game_version = value.game_version
      offset = (ctx.string)(game_version, buffer, offset)
      let experiments = value.experiments
      offset = (ctx.Experiments)(experiments, buffer, offset)
      let experiments_previously_used = value.experiments_previously_used
      offset = (ctx.bool)(experiments_previously_used, buffer, offset)
      return offset
    },
    packet_resource_pack_client_response: (value, buffer, offset) => {
      let response_status = value.response_status
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"none":0,"refused":1,"send_packs":2,"have_all_packs":3,"completed":4}[value] || value, buffer, offset)
      })(response_status, buffer, offset)
      let resourcepackids = value.resourcepackids
      offset = (ctx.ResourcePackIds)(resourcepackids, buffer, offset)
      return offset
    },
    packet_text: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"raw":0,"chat":1,"translation":2,"popup":3,"jukebox_popup":4,"tip":5,"system":6,"whisper":7,"announcement":8,"json_whisper":9,"json":10}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let needs_translation = value.needs_translation
      offset = (ctx.bool)(needs_translation, buffer, offset)
      let source_name = value.source_name
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(value, buffer, offset)
          case "whisper": return (ctx.string)(value, buffer, offset)
          case "announcement": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(source_name, buffer, offset)
      let message = value.message
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(value, buffer, offset)
          case "whisper": return (ctx.string)(value, buffer, offset)
          case "announcement": return (ctx.string)(value, buffer, offset)
          case "raw": return (ctx.string)(value, buffer, offset)
          case "tip": return (ctx.string)(value, buffer, offset)
          case "system": return (ctx.string)(value, buffer, offset)
          case "json_whisper": return (ctx.string)(value, buffer, offset)
          case "json": return (ctx.string)(value, buffer, offset)
          case "translation": return (ctx.string)(value, buffer, offset)
          case "popup": return (ctx.string)(value, buffer, offset)
          case "jukebox_popup": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(message, buffer, offset)
      let paramaters = value.paramaters
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "translation": return ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
          case "popup": return ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
          case "jukebox_popup": return ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(paramaters, buffer, offset)
      let xuid = value.xuid
      offset = (ctx.string)(xuid, buffer, offset)
      let platform_chat_id = value.platform_chat_id
      offset = (ctx.string)(platform_chat_id, buffer, offset)
      return offset
    },
    packet_set_time: (value, buffer, offset) => {
      let time = value.time
      offset = (ctx.zigzag32)(time, buffer, offset)
      return offset
    },
    packet_start_game: (value, buffer, offset) => {
      let entity_id = value.entity_id
      offset = (ctx.zigzag64)(entity_id, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint64)(runtime_entity_id, buffer, offset)
      let player_gamemode = value.player_gamemode
      offset = (ctx.GameMode)(player_gamemode, buffer, offset)
      let spawn = value.spawn
      offset = (ctx.vec3f)(spawn, buffer, offset)
      let rotation = value.rotation
      offset = (ctx.vec2f)(rotation, buffer, offset)
      let seed = value.seed
      offset = (ctx.zigzag32)(seed, buffer, offset)
      let biome_type = value.biome_type
      offset = (ctx.li16)(biome_type, buffer, offset)
      let biome_name = value.biome_name
      offset = (ctx.string)(biome_name, buffer, offset)
      let dimension = value.dimension
      offset = (ctx.zigzag32)(dimension, buffer, offset)
      let generator = value.generator
      offset = (ctx.zigzag32)(generator, buffer, offset)
      let world_gamemode = value.world_gamemode
      offset = (ctx.GameMode)(world_gamemode, buffer, offset)
      let difficulty = value.difficulty
      offset = (ctx.zigzag32)(difficulty, buffer, offset)
      let spawn_position = value.spawn_position
      offset = (ctx.BlockCoordinates)(spawn_position, buffer, offset)
      let achievements_disabled = value.achievements_disabled
      offset = (ctx.bool)(achievements_disabled, buffer, offset)
      let day_cycle_stop_time = value.day_cycle_stop_time
      offset = (ctx.zigzag32)(day_cycle_stop_time, buffer, offset)
      let edu_offer = value.edu_offer
      offset = (ctx.zigzag32)(edu_offer, buffer, offset)
      let edu_features_enabled = value.edu_features_enabled
      offset = (ctx.bool)(edu_features_enabled, buffer, offset)
      let edu_product_uuid = value.edu_product_uuid
      offset = (ctx.string)(edu_product_uuid, buffer, offset)
      let rain_level = value.rain_level
      offset = (ctx.lf32)(rain_level, buffer, offset)
      let lightning_level = value.lightning_level
      offset = (ctx.lf32)(lightning_level, buffer, offset)
      let has_confirmed_platform_locked_content = value.has_confirmed_platform_locked_content
      offset = (ctx.bool)(has_confirmed_platform_locked_content, buffer, offset)
      let is_multiplayer = value.is_multiplayer
      offset = (ctx.bool)(is_multiplayer, buffer, offset)
      let broadcast_to_lan = value.broadcast_to_lan
      offset = (ctx.bool)(broadcast_to_lan, buffer, offset)
      let xbox_live_broadcast_mode = value.xbox_live_broadcast_mode
      offset = (ctx.varint)(xbox_live_broadcast_mode, buffer, offset)
      let platform_broadcast_mode = value.platform_broadcast_mode
      offset = (ctx.varint)(platform_broadcast_mode, buffer, offset)
      let enable_commands = value.enable_commands
      offset = (ctx.bool)(enable_commands, buffer, offset)
      let is_texturepacks_required = value.is_texturepacks_required
      offset = (ctx.bool)(is_texturepacks_required, buffer, offset)
      let gamerules = value.gamerules
      offset = (ctx.GameRules)(gamerules, buffer, offset)
      let experiments = value.experiments
      offset = (ctx.Experiments)(experiments, buffer, offset)
      let experiments_previously_used = value.experiments_previously_used
      offset = (ctx.bool)(experiments_previously_used, buffer, offset)
      let bonus_chest = value.bonus_chest
      offset = (ctx.bool)(bonus_chest, buffer, offset)
      let map_enabled = value.map_enabled
      offset = (ctx.bool)(map_enabled, buffer, offset)
      let permission_level = value.permission_level
      offset = (ctx.zigzag32)(permission_level, buffer, offset)
      let server_chunk_tick_range = value.server_chunk_tick_range
      offset = (ctx.li32)(server_chunk_tick_range, buffer, offset)
      let has_locked_behavior_pack = value.has_locked_behavior_pack
      offset = (ctx.bool)(has_locked_behavior_pack, buffer, offset)
      let has_locked_resource_pack = value.has_locked_resource_pack
      offset = (ctx.bool)(has_locked_resource_pack, buffer, offset)
      let is_from_locked_world_template = value.is_from_locked_world_template
      offset = (ctx.bool)(is_from_locked_world_template, buffer, offset)
      let msa_gamertags_only = value.msa_gamertags_only
      offset = (ctx.bool)(msa_gamertags_only, buffer, offset)
      let is_from_world_template = value.is_from_world_template
      offset = (ctx.bool)(is_from_world_template, buffer, offset)
      let is_world_template_option_locked = value.is_world_template_option_locked
      offset = (ctx.bool)(is_world_template_option_locked, buffer, offset)
      let only_spawn_v1_villagers = value.only_spawn_v1_villagers
      offset = (ctx.bool)(only_spawn_v1_villagers, buffer, offset)
      let game_version = value.game_version
      offset = (ctx.string)(game_version, buffer, offset)
      let limited_world_width = value.limited_world_width
      offset = (ctx.li32)(limited_world_width, buffer, offset)
      let limited_world_length = value.limited_world_length
      offset = (ctx.li32)(limited_world_length, buffer, offset)
      let is_new_nether = value.is_new_nether
      offset = (ctx.bool)(is_new_nether, buffer, offset)
      let experimental_gameplay_override = value.experimental_gameplay_override
      offset = (ctx.bool)(experimental_gameplay_override, buffer, offset)
      let level_id = value.level_id
      offset = (ctx.string)(level_id, buffer, offset)
      let world_name = value.world_name
      offset = (ctx.string)(world_name, buffer, offset)
      let premium_world_template_id = value.premium_world_template_id
      offset = (ctx.string)(premium_world_template_id, buffer, offset)
      let is_trial = value.is_trial
      offset = (ctx.bool)(is_trial, buffer, offset)
      let movement_authority = value.movement_authority
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"client":0,"server":1,"server_v2_rewind":2}[value] || value, buffer, offset)
      })(movement_authority, buffer, offset)
      let current_tick = value.current_tick
      offset = (ctx.li64)(current_tick, buffer, offset)
      let enchantment_seed = value.enchantment_seed
      offset = (ctx.zigzag32)(enchantment_seed, buffer, offset)
      let block_palette = value.block_palette
      offset = (ctx.BlockPalette)(block_palette, buffer, offset)
      let itemstates = value.itemstates
      offset = (ctx.Itemstates)(itemstates, buffer, offset)
      let multiplayer_correlation_id = value.multiplayer_correlation_id
      offset = (ctx.string)(multiplayer_correlation_id, buffer, offset)
      let server_authoritative_inventory = value.server_authoritative_inventory
      offset = (ctx.bool)(server_authoritative_inventory, buffer, offset)
      return offset
    },
    packet_add_player: (value, buffer, offset) => {
      let uuid = value.uuid
      offset = (ctx.uuid)(uuid, buffer, offset)
      let username = value.username
      offset = (ctx.string)(username, buffer, offset)
      let entity_id_self = value.entity_id_self
      offset = (ctx.zigzag64)(entity_id_self, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let platform_chat_id = value.platform_chat_id
      offset = (ctx.string)(platform_chat_id, buffer, offset)
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.lf32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      let speed_x = value.speed_x
      offset = (ctx.lf32)(speed_x, buffer, offset)
      let speed_y = value.speed_y
      offset = (ctx.lf32)(speed_y, buffer, offset)
      let speed_z = value.speed_z
      offset = (ctx.lf32)(speed_z, buffer, offset)
      let pitch = value.pitch
      offset = (ctx.lf32)(pitch, buffer, offset)
      let yaw = value.yaw
      offset = (ctx.lf32)(yaw, buffer, offset)
      let head_yaw = value.head_yaw
      offset = (ctx.lf32)(head_yaw, buffer, offset)
      let held_item = value.held_item
      offset = (ctx.Item)(held_item, buffer, offset)
      let metadata = value.metadata
      offset = (ctx.MetadataDictionary)(metadata, buffer, offset)
      let flags = value.flags
      offset = (ctx.varint)(flags, buffer, offset)
      let command_permission = value.command_permission
      offset = (ctx.varint)(command_permission, buffer, offset)
      let action_permissions = value.action_permissions
      offset = (ctx.varint)(action_permissions, buffer, offset)
      let permission_level = value.permission_level
      offset = (ctx.varint)(permission_level, buffer, offset)
      let custom_stored_permissions = value.custom_stored_permissions
      offset = (ctx.varint)(custom_stored_permissions, buffer, offset)
      let user_id = value.user_id
      offset = (ctx.li64)(user_id, buffer, offset)
      let links = value.links
      offset = (ctx.Links)(links, buffer, offset)
      let device_id = value.device_id
      offset = (ctx.string)(device_id, buffer, offset)
      let device_os = value.device_os
      offset = (ctx.li32)(device_os, buffer, offset)
      return offset
    },
    packet_add_entity: (value, buffer, offset) => {
      let entity_id_self = value.entity_id_self
      offset = (ctx.zigzag64)(entity_id_self, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let entity_type = value.entity_type
      offset = (ctx.string)(entity_type, buffer, offset)
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.lf32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      let speed_x = value.speed_x
      offset = (ctx.lf32)(speed_x, buffer, offset)
      let speed_y = value.speed_y
      offset = (ctx.lf32)(speed_y, buffer, offset)
      let speed_z = value.speed_z
      offset = (ctx.lf32)(speed_z, buffer, offset)
      let pitch = value.pitch
      offset = (ctx.lf32)(pitch, buffer, offset)
      let yaw = value.yaw
      offset = (ctx.lf32)(yaw, buffer, offset)
      let head_yaw = value.head_yaw
      offset = (ctx.lf32)(head_yaw, buffer, offset)
      let attributes = value.attributes
      offset = (ctx.EntityAttributes)(attributes, buffer, offset)
      let metadata = value.metadata
      offset = (ctx.MetadataDictionary)(metadata, buffer, offset)
      let links = value.links
      offset = (ctx.Links)(links, buffer, offset)
      return offset
    },
    packet_remove_entity: (value, buffer, offset) => {
      let entity_id_self = value.entity_id_self
      offset = (ctx.zigzag64)(entity_id_self, buffer, offset)
      return offset
    },
    packet_add_item_entity: (value, buffer, offset) => {
      let entity_id_self = value.entity_id_self
      offset = (ctx.zigzag64)(entity_id_self, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let item = value.item
      offset = (ctx.Item)(item, buffer, offset)
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.lf32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      let speed_x = value.speed_x
      offset = (ctx.lf32)(speed_x, buffer, offset)
      let speed_y = value.speed_y
      offset = (ctx.lf32)(speed_y, buffer, offset)
      let speed_z = value.speed_z
      offset = (ctx.lf32)(speed_z, buffer, offset)
      let metadata = value.metadata
      offset = (ctx.MetadataDictionary)(metadata, buffer, offset)
      let is_from_fishing = value.is_from_fishing
      offset = (ctx.bool)(is_from_fishing, buffer, offset)
      return offset
    },
    packet_take_item_entity: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let target = value.target
      offset = (ctx.varint)(target, buffer, offset)
      return offset
    },
    packet_move_entity: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let flags = value.flags
      offset = (ctx.u8)(flags, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let rotation = value.rotation
      offset = (ctx.Rotation)(rotation, buffer, offset)
      return offset
    },
    packet_move_player: (value, buffer, offset) => {
      let runtime_id = value.runtime_id
      offset = (ctx.varint)(runtime_id, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let pitch = value.pitch
      offset = (ctx.lf32)(pitch, buffer, offset)
      let yaw = value.yaw
      offset = (ctx.lf32)(yaw, buffer, offset)
      let head_yaw = value.head_yaw
      offset = (ctx.lf32)(head_yaw, buffer, offset)
      let mode = value.mode
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"normal":0,"reset":1,"teleport":2,"rotation":3}[value] || value, buffer, offset)
      })(mode, buffer, offset)
      let on_ground = value.on_ground
      offset = (ctx.bool)(on_ground, buffer, offset)
      let ridden_runtime_id = value.ridden_runtime_id
      offset = (ctx.varint)(ridden_runtime_id, buffer, offset)
      let teleport = value.teleport
      offset = ((value, buffer, offset) => {
        switch (mode) {
          case "teleport": return ((value, buffer, offset) => {
            let cause = value.cause
            offset = ((value, buffer, offset) => {
              return (ctx.li32)({"unknown":0,"projectile":1,"chorus_fruit":2,"command":3,"behavior":4}[value] || value, buffer, offset)
            })(cause, buffer, offset)
            let source_entity_type = value.source_entity_type
            offset = (ctx.LegacyEntityType)(source_entity_type, buffer, offset)
            return offset
          })(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(teleport, buffer, offset)
      let tick = value.tick
      offset = (ctx.varint64)(tick, buffer, offset)
      return offset
    },
    packet_rider_jump: (value, buffer, offset) => {
      let jump_strength = value.jump_strength
      offset = (ctx.zigzag32)(jump_strength, buffer, offset)
      return offset
    },
    packet_update_block: (value, buffer, offset) => {
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let block_runtime_id = value.block_runtime_id
      offset = (ctx.varint)(block_runtime_id, buffer, offset)
      let block_priority = value.block_priority
      offset = (ctx.varint)(block_priority, buffer, offset)
      let storage = value.storage
      offset = (ctx.varint)(storage, buffer, offset)
      return offset
    },
    packet_add_painting: (value, buffer, offset) => {
      let entity_id_self = value.entity_id_self
      offset = (ctx.zigzag64)(entity_id_self, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let direction = value.direction
      offset = (ctx.zigzag32)(direction, buffer, offset)
      let title = value.title
      offset = (ctx.string)(title, buffer, offset)
      return offset
    },
    packet_tick_sync: (value, buffer, offset) => {
      let request_time = value.request_time
      offset = (ctx.li64)(request_time, buffer, offset)
      let response_time = value.response_time
      offset = (ctx.li64)(response_time, buffer, offset)
      return offset
    },
    packet_level_sound_event_old: (value, buffer, offset) => {
      let sound_id = value.sound_id
      offset = (ctx.u8)(sound_id, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let block_id = value.block_id
      offset = (ctx.zigzag32)(block_id, buffer, offset)
      let entity_type = value.entity_type
      offset = (ctx.zigzag32)(entity_type, buffer, offset)
      let is_baby_mob = value.is_baby_mob
      offset = (ctx.bool)(is_baby_mob, buffer, offset)
      let is_global = value.is_global
      offset = (ctx.bool)(is_global, buffer, offset)
      return offset
    },
    packet_level_event: (value, buffer, offset) => {
      let event = value.event
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"sound_click":1000,"sound_click_fail":1001,"sound_shoot":1002,"sound_door":1003,"sound_fizz":1004,"sound_ignite":1005,"sound_ghast":1007,"sound_ghast_shoot":1008,"sound_blaze_shoot":1009,"sound_door_bump":1010,"sound_door_crash":1012,"sound_enderman_teleport":1018,"sound_anvil_break":1020,"sound_anvil_use":1021,"sound_anvil_fall":1022,"sound_pop":1030,"sound_portal":1032,"sound_itemframe_add_item":1040,"sound_itemframe_remove":1041,"sound_itemframe_place":1042,"sound_itemframe_remove_item":1043,"sound_itemframe_rotate_item":1044,"sound_camera":1050,"sound_orb":1051,"sound_totem":1052,"sound_armor_stand_break":1060,"sound_armor_stand_hit":1061,"sound_armor_stand_fall":1062,"sound_armor_stand_place":1063,"particle_shoot":2000,"particle_destroy":2001,"particle_splash":2002,"particle_eye_despawn":2003,"particle_spawn":2004,"guardian_curse":2006,"particle_block_force_field":2008,"particle_projectile_hit":2009,"particle_enderman_teleport":2013,"particle_punch_block":2014,"start_rain":3001,"start_thunder":3002,"stop_rain":3003,"stop_thunder":3004,"pause_game":3005,"pause_game_no_screen":3006,"set_game_speed":3007,"redstone_trigger":3500,"cauldron_explode":3501,"cauldron_dye_armor":3502,"cauldron_clean_armor":3503,"cauldron_fill_potion":3504,"cauldron_take_potion":3505,"cauldron_fill_water":3506,"cauldron_take_water":3507,"cauldron_add_dye":3508,"cauldron_clean_banner":3509,"block_start_break":3600,"block_stop_break":3601,"set_data":4000,"players_sleeping":9800,"add_particle_mask":16384}[value] || value, buffer, offset)
      })(event, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let data = value.data
      offset = (ctx.zigzag32)(data, buffer, offset)
      return offset
    },
    packet_block_event: (value, buffer, offset) => {
      let position = value.position
      offset = (ctx.BlockCoordinates)(position, buffer, offset)
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"sound":0,"change_state":1}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let data = value.data
      offset = (ctx.zigzag32)(data, buffer, offset)
      return offset
    },
    packet_entity_event: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let event_id = value.event_id
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"jump":1,"hurt_animation":2,"death_animation":3,"arm_swing":4,"stop_attack":5,"tame_fail":6,"tame_success":7,"shake_wet":8,"use_item":9,"eat_grass_animation":10,"fish_hook_bubble":11,"fish_hook_position":12,"fish_hook_hook":13,"fish_hook_tease":14,"squid_ink_cloud":15,"zombie_villager_cure":16,"respawn":18,"iron_golem_offer_flower":19,"iron_golem_withdraw_flower":20,"love_particles":21,"villager_angry":22,"villager_happy":23,"witch_spell_particles":24,"firework_particles":25,"in_love_particles":26,"silverfish_spawn_animation":27,"guardian_attack":28,"witch_drink_potion":29,"witch_throw_potion":30,"minecart_tnt_prime_fuse":31,"creeper_prime_fuse":32,"air_supply_expired":33,"player_add_xp_levels":34,"elder_guardian_curse":35,"agent_arm_swing":36,"ender_dragon_death":37,"dust_particles":38,"arrow_shake":39,"eating_item":57,"baby_animal_feed":60,"death_smoke_cloud":61,"complete_trade":62,"remove_leash":63,"consume_totem":65,"player_check_treasure_hunter_achievement":66,"entity_spawn":67,"dragon_puke":68,"item_entity_merge":69,"start_swim":70,"balloon_pop":71,"treasure_hunt":72,"agent_summon":73,"charged_crossbow":74,"fall":75}[value] || value, buffer, offset)
      })(event_id, buffer, offset)
      let data = value.data
      offset = (ctx.zigzag32)(data, buffer, offset)
      return offset
    },
    packet_mob_effect: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let event_id = value.event_id
      offset = (ctx.u8)(event_id, buffer, offset)
      let effect_id = value.effect_id
      offset = (ctx.zigzag32)(effect_id, buffer, offset)
      let amplifier = value.amplifier
      offset = (ctx.zigzag32)(amplifier, buffer, offset)
      let particles = value.particles
      offset = (ctx.bool)(particles, buffer, offset)
      let duration = value.duration
      offset = (ctx.zigzag32)(duration, buffer, offset)
      return offset
    },
    packet_update_attributes: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint64)(runtime_entity_id, buffer, offset)
      let attributes = value.attributes
      offset = (ctx.PlayerAttributes)(attributes, buffer, offset)
      let tick = value.tick
      offset = (ctx.varint64)(tick, buffer, offset)
      return offset
    },
    packet_inventory_transaction: (value, buffer, offset) => {
      let transaction = value.transaction
      offset = (ctx.Transaction)(transaction, buffer, offset)
      return offset
    },
    packet_mob_equipment: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let item = value.item
      offset = (ctx.Item)(item, buffer, offset)
      let slot = value.slot
      offset = (ctx.u8)(slot, buffer, offset)
      let selected_slot = value.selected_slot
      offset = (ctx.u8)(selected_slot, buffer, offset)
      let windows_id = value.windows_id
      offset = (ctx.WindowID)(windows_id, buffer, offset)
      return offset
    },
    packet_mob_armor_equipment: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let helmet = value.helmet
      offset = (ctx.Item)(helmet, buffer, offset)
      let chestplate = value.chestplate
      offset = (ctx.Item)(chestplate, buffer, offset)
      let leggings = value.leggings
      offset = (ctx.Item)(leggings, buffer, offset)
      let boots = value.boots
      offset = (ctx.Item)(boots, buffer, offset)
      return offset
    },
    packet_interact: (value, buffer, offset) => {
      let action_id = value.action_id
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"leave_vehicle":3,"mouse_over_entity":4,"open_inventory":6}[value] || value, buffer, offset)
      })(action_id, buffer, offset)
      let target_runtime_entity_id = value.target_runtime_entity_id
      offset = (ctx.varint)(target_runtime_entity_id, buffer, offset)
      let position = value.position
      offset = ((value, buffer, offset) => {
        switch (action_id) {
          case "mouse_over_entity": return (ctx.vec3f)(value, buffer, offset)
          case "leave_vehicle": return (ctx.vec3f)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(position, buffer, offset)
      return offset
    },
    packet_block_pick_request: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.zigzag32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.zigzag32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.zigzag32)(z, buffer, offset)
      let add_user_data = value.add_user_data
      offset = (ctx.bool)(add_user_data, buffer, offset)
      let selected_slot = value.selected_slot
      offset = (ctx.u8)(selected_slot, buffer, offset)
      return offset
    },
    packet_entity_pick_request: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.lu64)(runtime_entity_id, buffer, offset)
      let selected_slot = value.selected_slot
      offset = (ctx.u8)(selected_slot, buffer, offset)
      return offset
    },
    packet_player_action: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let action = value.action
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"start_break":0,"abort_break":1,"stop_break":2,"get_updated_block":3,"drop_item":4,"start_sleeping":5,"stop_sleeping":6,"respawn":7,"jump":8,"start_sprint":9,"stop_sprint":10,"start_sneak":11,"stop_sneak":12,"creative_player_destroy_block":13,"dimension_change_ack":14,"start_glide":15,"stop_glide":16,"build_denied":17,"continue_break":18,"change_skin":19,"set_enchatnment_seed":20,"swimming":21,"stop_swimming":22,"start_spin_attack":23,"stop_spin_attack":24,"ineract_block":25}[value] || value, buffer, offset)
      })(action, buffer, offset)
      let position = value.position
      offset = (ctx.BlockCoordinates)(position, buffer, offset)
      let face = value.face
      offset = (ctx.zigzag32)(face, buffer, offset)
      return offset
    },
    packet_hurt_armor: (value, buffer, offset) => {
      let health = value.health
      offset = (ctx.zigzag32)(health, buffer, offset)
      return offset
    },
    packet_set_entity_data: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let metadata = value.metadata
      offset = (ctx.MetadataDictionary)(metadata, buffer, offset)
      let tick = value.tick
      offset = (ctx.varint)(tick, buffer, offset)
      return offset
    },
    packet_set_entity_motion: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let velocity = value.velocity
      offset = (ctx.vec3f)(velocity, buffer, offset)
      return offset
    },
    packet_set_entity_link: (value, buffer, offset) => {
      let link = value.link
      offset = (ctx.Link)(link, buffer, offset)
      return offset
    },
    packet_set_health: (value, buffer, offset) => {
      let health = value.health
      offset = (ctx.zigzag32)(health, buffer, offset)
      return offset
    },
    packet_set_spawn_position: (value, buffer, offset) => {
      let spawn_type = value.spawn_type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"player":0,"world":1}[value] || value, buffer, offset)
      })(spawn_type, buffer, offset)
      let player_position = value.player_position
      offset = (ctx.BlockCoordinates)(player_position, buffer, offset)
      let dimension = value.dimension
      offset = (ctx.zigzag32)(dimension, buffer, offset)
      let world_position = value.world_position
      offset = (ctx.BlockCoordinates)(world_position, buffer, offset)
      return offset
    },
    packet_animate: (value, buffer, offset) => {
      let action_id = value.action_id
      offset = (ctx.zigzag32)(action_id, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      return offset
    },
    packet_respawn: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.lf32)(x, buffer, offset)
      let y = value.y
      offset = (ctx.lf32)(y, buffer, offset)
      let z = value.z
      offset = (ctx.lf32)(z, buffer, offset)
      let state = value.state
      offset = (ctx.u8)(state, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      return offset
    },
    packet_container_open: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let window_type = value.window_type
      offset = (ctx.WindowType)(window_type, buffer, offset)
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.zigzag64)(runtime_entity_id, buffer, offset)
      return offset
    },
    packet_container_close: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let server = value.server
      offset = (ctx.bool)(server, buffer, offset)
      return offset
    },
    packet_player_hotbar: (value, buffer, offset) => {
      let selected_slot = value.selected_slot
      offset = (ctx.varint)(selected_slot, buffer, offset)
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let select_slot = value.select_slot
      offset = (ctx.bool)(select_slot, buffer, offset)
      return offset
    },
    packet_inventory_content: (value, buffer, offset) => {
      let inventory_id = value.inventory_id
      offset = (ctx.varint)(inventory_id, buffer, offset)
      let input = value.input
      offset = (ctx.ItemStacks)(input, buffer, offset)
      return offset
    },
    packet_inventory_slot: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let slot = value.slot
      offset = (ctx.varint)(slot, buffer, offset)
      let item = value.item
      offset = (ctx.ItemStack)(item, buffer, offset)
      return offset
    },
    packet_container_set_data: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let property = value.property
      offset = (ctx.zigzag32)(property, buffer, offset)
      let value1 = value.value
      offset = (ctx.zigzag32)(value1, buffer, offset)
      return offset
    },
    packet_crafting_data: (value, buffer, offset) => {
      let recipes = value.recipes
      offset = (ctx.Recipes)(recipes, buffer, offset)
      let potion_type_recipes = value.potion_type_recipes
      offset = (ctx.PotionTypeRecipes)(potion_type_recipes, buffer, offset)
      let potion_container_recipes = value.potion_container_recipes
      offset = (ctx.PotionContainerChangeRecipes)(potion_container_recipes, buffer, offset)
      let is_clean = value.is_clean
      offset = (ctx.bool)(is_clean, buffer, offset)
      return offset
    },
    packet_crafting_event: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let recipe_type = value.recipe_type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"inventory":0,"crafting":1,"workbench":2}[value] || value, buffer, offset)
      })(recipe_type, buffer, offset)
      let recipe_id = value.recipe_id
      offset = (ctx.uuid)(recipe_id, buffer, offset)
      let input = value.input
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.Item)(value[i], buffer, offset)
        }
        return offset
      })(input, buffer, offset)
      let result = value.result
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.Item)(value[i], buffer, offset)
        }
        return offset
      })(result, buffer, offset)
      return offset
    },
    packet_gui_data_pick_item: (value, buffer, offset) => {
      return offset
    },
    packet_adventure_settings: (value, buffer, offset) => {
      let flags = value.flags
      offset = (ctx.AdventureFlags)(flags, buffer, offset)
      let command_permission = value.command_permission
      offset = ((value, buffer, offset) => {
        return (ctx.varint32)({"normal":0,"operator":1,"host":2,"automation":3,"admin":4}[value] || value, buffer, offset)
      })(command_permission, buffer, offset)
      let action_permissions = value.action_permissions
      offset = (ctx.ActionPermissions)(action_permissions, buffer, offset)
      let permission_level = value.permission_level
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"visitor":0,"member":1,"operator":2,"custom":3}[value] || value, buffer, offset)
      })(permission_level, buffer, offset)
      let custom_stored_permissions = value.custom_stored_permissions
      offset = (ctx.varint)(custom_stored_permissions, buffer, offset)
      let user_id = value.user_id
      offset = (ctx.li64)(user_id, buffer, offset)
      return offset
    },
    packet_block_entity_data: (value, buffer, offset) => {
      let position = value.position
      offset = (ctx.BlockCoordinates)(position, buffer, offset)
      let nbt = value.nbt
      offset = (ctx.nbt)(nbt, buffer, offset)
      return offset
    },
    packet_player_input: (value, buffer, offset) => {
      let motion_x = value.motion_x
      offset = (ctx.lf32)(motion_x, buffer, offset)
      let motion_z = value.motion_z
      offset = (ctx.lf32)(motion_z, buffer, offset)
      let jumping = value.jumping
      offset = (ctx.bool)(jumping, buffer, offset)
      let sneaking = value.sneaking
      offset = (ctx.bool)(sneaking, buffer, offset)
      return offset
    },
    packet_level_chunk: (value, buffer, offset) => {
      let x = value.x
      offset = (ctx.zigzag32)(x, buffer, offset)
      let z = value.z
      offset = (ctx.zigzag32)(z, buffer, offset)
      let sub_chunk_count = value.sub_chunk_count
      offset = (ctx.varint)(sub_chunk_count, buffer, offset)
      let cache_enabled = value.cache_enabled
      offset = (ctx.bool)(cache_enabled, buffer, offset)
      let blobs = value.blobs
      offset = ((value, buffer, offset) => {
        switch (cache_enabled) {
          case true: return ((value, buffer, offset) => {
            let hashes = value.hashes
            offset = ((value, buffer, offset) => {
              offset = (ctx.varint)(value.length, buffer, offset)
              for (let i = 0; i < value.length; i++) {
                offset = (ctx.lu64)(value[i], buffer, offset)
              }
              return offset
            })(hashes, buffer, offset)
            return offset
          })(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(blobs, buffer, offset)
      let payload = value.payload
      offset = (ctx.ByteArray)(payload, buffer, offset)
      return offset
    },
    packet_set_commands_enabled: (value, buffer, offset) => {
      let enabled = value.enabled
      offset = (ctx.bool)(enabled, buffer, offset)
      return offset
    },
    packet_set_difficulty: (value, buffer, offset) => {
      let difficulty = value.difficulty
      offset = (ctx.varint)(difficulty, buffer, offset)
      return offset
    },
    packet_change_dimension: (value, buffer, offset) => {
      let dimension = value.dimension
      offset = (ctx.zigzag32)(dimension, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let respawn = value.respawn
      offset = (ctx.bool)(respawn, buffer, offset)
      return offset
    },
    packet_set_player_game_type: (value, buffer, offset) => {
      let gamemode = value.gamemode
      offset = (ctx.GameMode)(gamemode, buffer, offset)
      return offset
    },
    packet_player_list: (value, buffer, offset) => {
      let records = value.records
      offset = (ctx.PlayerRecords)(records, buffer, offset)
      return offset
    },
    packet_simple_event: (value, buffer, offset) => {
      let event_type = value.event_type
      offset = (ctx.lu16)(event_type, buffer, offset)
      return offset
    },
    packet_event: (value, buffer, offset) => {
      let runtime_id = value.runtime_id
      offset = (ctx.varint64)(runtime_id, buffer, offset)
      let event_type = value.event_type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"achievement_awarded":0,"entity_interact":1,"portal_built":2,"portal_used":3,"mob_killed":4,"cauldron_used":5,"player_death":6,"boss_killed":7,"agent_command":8,"agent_created":9,"banner_pattern_removed":10,"commaned_executed":11,"fish_bucketed":12,"mob_born":13,"pet_died":14,"cauldron_block_used":15,"composter_block_used":16,"bell_block_used":17}[value] || value, buffer, offset)
      })(event_type, buffer, offset)
      let use_player_id = value.use_player_id
      offset = (ctx.u8)(use_player_id, buffer, offset)
      let event_data = value.event_data
      offset = (ctx.restBuffer)(event_data, buffer, offset)
      return offset
    },
    packet_spawn_experience_orb: (value, buffer, offset) => {
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let count = value.count
      offset = (ctx.zigzag32)(count, buffer, offset)
      return offset
    },
    packet_clientbound_map_item_data: (value, buffer, offset) => {
      let mapinfo = value.mapinfo
      offset = (ctx.MapInfo)(mapinfo, buffer, offset)
      return offset
    },
    packet_map_info_request: (value, buffer, offset) => {
      let map_id = value.map_id
      offset = (ctx.zigzag64)(map_id, buffer, offset)
      return offset
    },
    packet_request_chunk_radius: (value, buffer, offset) => {
      let chunk_radius = value.chunk_radius
      offset = (ctx.zigzag32)(chunk_radius, buffer, offset)
      return offset
    },
    packet_chunk_radius_update: (value, buffer, offset) => {
      let chunk_radius = value.chunk_radius
      offset = (ctx.zigzag32)(chunk_radius, buffer, offset)
      return offset
    },
    packet_item_frame_drop_item: (value, buffer, offset) => {
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      return offset
    },
    packet_game_rules_changed: (value, buffer, offset) => {
      let rules = value.rules
      offset = (ctx.GameRules)(rules, buffer, offset)
      return offset
    },
    packet_camera: (value, buffer, offset) => {
      let camera_entity_unique_id = value.camera_entity_unique_id
      offset = (ctx.zigzag64)(camera_entity_unique_id, buffer, offset)
      let target_player_unique_id = value.target_player_unique_id
      offset = (ctx.zigzag64)(target_player_unique_id, buffer, offset)
      return offset
    },
    packet_boss_event: (value, buffer, offset) => {
      let boss_entity_id = value.boss_entity_id
      offset = (ctx.zigzag64)(boss_entity_id, buffer, offset)
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"show_bar":0,"register_player":1,"hide_bar":2,"unregister_player":3,"set_bar_progress":4,"set_bar_title":5,"update_properties":6,"texture":7}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let player_id = value.player_id
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "register_player": return (ctx.zigzag64)(value, buffer, offset)
          case "unregister_player": return (ctx.zigzag64)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(player_id, buffer, offset)
      let title = value.title
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "show": return (ctx.string)(value, buffer, offset)
          case "set_bar_title": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(title, buffer, offset)
      let bar_progress = value.bar_progress
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "show": return (ctx.lf32)(value, buffer, offset)
          case "set_bar_progress": return (ctx.lf32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(bar_progress, buffer, offset)
      let darkness_factor = value.darkness_factor
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "update_properties": return (ctx.li16)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(darkness_factor, buffer, offset)
      let color = value.color
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "texture": return (ctx.varint)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(color, buffer, offset)
      let overlay = value.overlay
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "texture": return (ctx.varint)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(overlay, buffer, offset)
      return offset
    },
    packet_show_credits: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let status = value.status
      offset = (ctx.zigzag32)(status, buffer, offset)
      return offset
    },
    packet_available_commands: (value, buffer, offset) => {
      let values_len = value.values_len
      offset = (ctx.varint)(values_len, buffer, offset)
      let _enum_type = value._enum_type
      offset = (() => {
          if (value.values_len <= 0xff) _enum_type = 'byte'
          else if (value.values_len <= 0xffff) _enum_type = 'short'
          else if (value.values_len <= 0xffffff) _enum_type = 'int'
          return offset
        })();(()=>{})(_enum_type, buffer, offset)
      let enum_values = value.enum_values
      offset = ((value, buffer, offset) => {
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.string)(value[i], buffer, offset)
        }
        return offset
      })(enum_values, buffer, offset)
      let suffixes = value.suffixes
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.string)(value[i], buffer, offset)
        }
        return offset
      })(suffixes, buffer, offset)
      let enums = value.enums
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let name1 = value.name
          offset = (ctx.string)(name1, buffer, offset)
          let values = value.values
          offset = ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = ((value, buffer, offset) => {
              switch (_enum_type) {
                case "byte": return (ctx.u8)(value, buffer, offset)
                case "short": return (ctx.lu16)(value, buffer, offset)
                case "int": return (ctx.lu32)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(value[i], buffer, offset)
            }
            return offset
          })(values, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(enums, buffer, offset)
      let command_data = value.command_data
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let name1 = value.name
          offset = (ctx.string)(name1, buffer, offset)
          let description = value.description
          offset = (ctx.string)(description, buffer, offset)
          let flags1 = value.flags
          offset = (ctx.u8)(flags1, buffer, offset)
          let permission_level1 = value.permission_level
          offset = (ctx.u8)(permission_level1, buffer, offset)
          let alias = value.alias
          offset = (ctx.li32)(alias, buffer, offset)
          let overloads = value.overloads
          offset = ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = ((value, buffer, offset) => {
              offset = (ctx.varint)(value.length, buffer, offset)
              for (let i = 0; i < value.length; i++) {
                offset = ((value, buffer, offset) => {
                let paramater_name = value.paramater_name
                offset = (ctx.string)(paramater_name, buffer, offset)
                let value_type = value.value_type
                offset = ((value, buffer, offset) => {
                  return (ctx.lu16)({"int":1,"float":2,"value":3,"wildcard_int":4,"operator":5,"target":6,"file_path":14,"string":29,"position":37,"message":41,"raw_text":43,"json":46,"command":53}[value] || value, buffer, offset)
                })(value_type, buffer, offset)
                let enum_type = value.enum_type
                offset = ((value, buffer, offset) => {
                  return (ctx.lu16)({"valid":16,"enum":32,"suffixed":256,"soft_enum":1024}[value] || value, buffer, offset)
                })(enum_type, buffer, offset)
                let optional = value.optional
                offset = (ctx.bool)(optional, buffer, offset)
                let options = value.options
                offset = (ctx.CommandFlags)(options, buffer, offset)
                return offset
              })(value[i], buffer, offset)
              }
              return offset
            })(value[i], buffer, offset)
            }
            return offset
          })(overloads, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(command_data, buffer, offset)
      let dynamic_enums = value.dynamic_enums
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let name1 = value.name
          offset = (ctx.string)(name1, buffer, offset)
          let values = value.values
          offset = ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(values, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(dynamic_enums, buffer, offset)
      let enum_constraints = value.enum_constraints
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let value_index = value.value_index
          offset = (ctx.li32)(value_index, buffer, offset)
          let enum_index = value.enum_index
          offset = (ctx.li32)(enum_index, buffer, offset)
          let constraints = value.constraints
          offset = ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = ((value, buffer, offset) => {
              let constraint = value.constraint
              offset = ((value, buffer, offset) => {
                return (ctx.u8)({"cheats_enabled":0}[value] || value, buffer, offset)
              })(constraint, buffer, offset)
              return offset
            })(value[i], buffer, offset)
            }
            return offset
          })(constraints, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(enum_constraints, buffer, offset)
      return offset
    },
    packet_command_request: (value, buffer, offset) => {
      let command = value.command
      offset = (ctx.string)(command, buffer, offset)
      let origin = value.origin
      offset = (ctx.CommandOrigin)(origin, buffer, offset)
      let interval = value.interval
      offset = (ctx.bool)(interval, buffer, offset)
      return offset
    },
    packet_command_block_update: (value, buffer, offset) => {
      let is_block = value.is_block
      offset = (ctx.bool)(is_block, buffer, offset)
      return offset
    },
    packet_command_output: (value, buffer, offset) => {
      let origin = value.origin
      offset = (ctx.CommandOrigin)(origin, buffer, offset)
      let output_type = value.output_type
      offset = (ctx.i8)(output_type, buffer, offset)
      let success_count = value.success_count
      offset = (ctx.varint)(success_count, buffer, offset)
      let output = value.output
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = ((value, buffer, offset) => {
          let success = value.success
          offset = (ctx.bool)(success, buffer, offset)
          let message_id = value.message_id
          offset = (ctx.string)(message_id, buffer, offset)
          let paramaters1 = value.paramaters
          offset = ((value, buffer, offset) => {
            offset = (ctx.varint)(value.length, buffer, offset)
            for (let i = 0; i < value.length; i++) {
              offset = (ctx.string)(value[i], buffer, offset)
            }
            return offset
          })(paramaters1, buffer, offset)
          return offset
        })(value[i], buffer, offset)
        }
        return offset
      })(output, buffer, offset)
      return offset
    },
    packet_update_trade: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let window_type = value.window_type
      offset = (ctx.WindowType)(window_type, buffer, offset)
      let size1 = value.size
      offset = (ctx.varint)(size1, buffer, offset)
      let trade_tier = value.trade_tier
      offset = (ctx.varint)(trade_tier, buffer, offset)
      let villager_unique_id = value.villager_unique_id
      offset = (ctx.varint64)(villager_unique_id, buffer, offset)
      let entity_unique_id = value.entity_unique_id
      offset = (ctx.varint64)(entity_unique_id, buffer, offset)
      let display_name = value.display_name
      offset = (ctx.string)(display_name, buffer, offset)
      let new_trading_ui = value.new_trading_ui
      offset = (ctx.bool)(new_trading_ui, buffer, offset)
      let economic_trades = value.economic_trades
      offset = (ctx.bool)(economic_trades, buffer, offset)
      let offers = value.offers
      offset = (ctx.nbt)(offers, buffer, offset)
      return offset
    },
    packet_update_equipment: (value, buffer, offset) => {
      let window_id = value.window_id
      offset = (ctx.WindowID)(window_id, buffer, offset)
      let window_type = value.window_type
      offset = (ctx.WindowType)(window_type, buffer, offset)
      let size1 = value.size
      offset = (ctx.u8)(size1, buffer, offset)
      let entity_id = value.entity_id
      offset = (ctx.zigzag64)(entity_id, buffer, offset)
      let inventory = value.inventory
      offset = (ctx.nbt)(inventory, buffer, offset)
      return offset
    },
    packet_resource_pack_data_info: (value, buffer, offset) => {
      let package_id = value.package_id
      offset = (ctx.string)(package_id, buffer, offset)
      let max_chunk_size = value.max_chunk_size
      offset = (ctx.lu32)(max_chunk_size, buffer, offset)
      let chunk_count = value.chunk_count
      offset = (ctx.lu32)(chunk_count, buffer, offset)
      let compressed_package_size = value.compressed_package_size
      offset = (ctx.lu64)(compressed_package_size, buffer, offset)
      let hash = value.hash
      offset = (ctx.ByteArray)(hash, buffer, offset)
      let is_premium = value.is_premium
      offset = (ctx.bool)(is_premium, buffer, offset)
      let pack_type = value.pack_type
      offset = (ctx.u8)(pack_type, buffer, offset)
      return offset
    },
    packet_resource_pack_chunk_data: (value, buffer, offset) => {
      let package_id = value.package_id
      offset = (ctx.string)(package_id, buffer, offset)
      let chunk_index = value.chunk_index
      offset = (ctx.lu32)(chunk_index, buffer, offset)
      let progress = value.progress
      offset = (ctx.lu64)(progress, buffer, offset)
      let payload = value.payload
      offset = (ctx.ByteArray)(payload, buffer, offset)
      return offset
    },
    packet_resource_pack_chunk_request: (value, buffer, offset) => {
      let package_id = value.package_id
      offset = (ctx.string)(package_id, buffer, offset)
      let chunk_index = value.chunk_index
      offset = (ctx.lu32)(chunk_index, buffer, offset)
      return offset
    },
    packet_transfer: (value, buffer, offset) => {
      let server_address = value.server_address
      offset = (ctx.string)(server_address, buffer, offset)
      let port = value.port
      offset = (ctx.lu16)(port, buffer, offset)
      return offset
    },
    packet_play_sound: (value, buffer, offset) => {
      let name = value.name
      offset = (ctx.string)(name, buffer, offset)
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let volume = value.volume
      offset = (ctx.lf32)(volume, buffer, offset)
      let pitch = value.pitch
      offset = (ctx.lf32)(pitch, buffer, offset)
      return offset
    },
    packet_stop_sound: (value, buffer, offset) => {
      let name = value.name
      offset = (ctx.string)(name, buffer, offset)
      let stop_all = value.stop_all
      offset = (ctx.bool)(stop_all, buffer, offset)
      return offset
    },
    packet_set_title: (value, buffer, offset) => {
      let type = value.type
      offset = (ctx.zigzag32)(type, buffer, offset)
      let text = value.text
      offset = (ctx.string)(text, buffer, offset)
      let fade_in_time = value.fade_in_time
      offset = (ctx.zigzag32)(fade_in_time, buffer, offset)
      let stay_time = value.stay_time
      offset = (ctx.zigzag32)(stay_time, buffer, offset)
      let fade_out_time = value.fade_out_time
      offset = (ctx.zigzag32)(fade_out_time, buffer, offset)
      return offset
    },
    packet_add_behavior_tree: (value, buffer, offset) => {
      let behaviortree = value.behaviortree
      offset = (ctx.string)(behaviortree, buffer, offset)
      return offset
    },
    packet_structure_block_update: (value, buffer, offset) => {
      return offset
    },
    packet_show_store_offer: (value, buffer, offset) => {
      let unknown0 = value.unknown0
      offset = (ctx.string)(unknown0, buffer, offset)
      let unknown1 = value.unknown1
      offset = (ctx.bool)(unknown1, buffer, offset)
      return offset
    },
    packet_purchase_receipt: (value, buffer, offset) => {
      return offset
    },
    packet_player_skin: (value, buffer, offset) => {
      let uuid = value.uuid
      offset = (ctx.uuid)(uuid, buffer, offset)
      let skin = value.skin
      offset = (ctx.Skin)(skin, buffer, offset)
      let skin_name = value.skin_name
      offset = (ctx.string)(skin_name, buffer, offset)
      let old_skin_name = value.old_skin_name
      offset = (ctx.string)(old_skin_name, buffer, offset)
      let is_verified = value.is_verified
      offset = (ctx.bool)(is_verified, buffer, offset)
      return offset
    },
    packet_sub_client_login: (value, buffer, offset) => {
      return offset
    },
    packet_initiate_web_socket_connection: (value, buffer, offset) => {
      let server = value.server
      offset = (ctx.string)(server, buffer, offset)
      return offset
    },
    packet_set_last_hurt_by: (value, buffer, offset) => {
      let unknown = value.unknown
      offset = (ctx.varint)(unknown, buffer, offset)
      return offset
    },
    packet_book_edit: (value, buffer, offset) => {
      let type = value.type
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"replace_page":0,"add_page":1,"delete_page":2,"swap_pages":3,"sign":4}[value] || value, buffer, offset)
      })(type, buffer, offset)
      let slot = value.slot
      offset = (ctx.u8)(slot, buffer, offset)
      let page_number = value.page_number
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.u8)(value, buffer, offset)
          case "add_page": return (ctx.u8)(value, buffer, offset)
          case "delete_page": return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(page_number, buffer, offset)
      let text = value.text
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(value, buffer, offset)
          case "add_page": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(text, buffer, offset)
      let photo_name = value.photo_name
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(value, buffer, offset)
          case "add_page": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(photo_name, buffer, offset)
      let page1 = value.page1
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(page1, buffer, offset)
      let page2 = value.page2
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(page2, buffer, offset)
      let title = value.title
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(title, buffer, offset)
      let author = value.author
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(author, buffer, offset)
      let xuid = value.xuid
      offset = ((value, buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(xuid, buffer, offset)
      return offset
    },
    packet_npc_request: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint)(runtime_entity_id, buffer, offset)
      let unknown0 = value.unknown0
      offset = (ctx.u8)(unknown0, buffer, offset)
      let unknown1 = value.unknown1
      offset = (ctx.string)(unknown1, buffer, offset)
      let unknown2 = value.unknown2
      offset = (ctx.u8)(unknown2, buffer, offset)
      return offset
    },
    packet_photo_transfer: (value, buffer, offset) => {
      let file_name = value.file_name
      offset = (ctx.string)(file_name, buffer, offset)
      let image_data = value.image_data
      offset = (ctx.string)(image_data, buffer, offset)
      let unknown2 = value.unknown2
      offset = (ctx.string)(unknown2, buffer, offset)
      return offset
    },
    packet_modal_form_request: (value, buffer, offset) => {
      let form_id = value.form_id
      offset = (ctx.varint)(form_id, buffer, offset)
      let data = value.data
      offset = (ctx.string)(data, buffer, offset)
      return offset
    },
    packet_modal_form_response: (value, buffer, offset) => {
      let form_id = value.form_id
      offset = (ctx.varint)(form_id, buffer, offset)
      let data = value.data
      offset = (ctx.string)(data, buffer, offset)
      return offset
    },
    packet_server_settings_request: (value, buffer, offset) => {
      return offset
    },
    packet_server_settings_response: (value, buffer, offset) => {
      let form_id = value.form_id
      offset = (ctx.varint)(form_id, buffer, offset)
      let data = value.data
      offset = (ctx.string)(data, buffer, offset)
      return offset
    },
    packet_show_profile: (value, buffer, offset) => {
      let xuid = value.xuid
      offset = (ctx.string)(xuid, buffer, offset)
      return offset
    },
    packet_set_default_game_type: (value, buffer, offset) => {
      let gamemode = value.gamemode
      offset = (ctx.GameMode)(gamemode, buffer, offset)
      return offset
    },
    packet_remove_objective: (value, buffer, offset) => {
      let objective_name = value.objective_name
      offset = (ctx.string)(objective_name, buffer, offset)
      return offset
    },
    packet_set_display_objective: (value, buffer, offset) => {
      let display_slot = value.display_slot
      offset = (ctx.string)(display_slot, buffer, offset)
      let objective_name = value.objective_name
      offset = (ctx.string)(objective_name, buffer, offset)
      let display_name = value.display_name
      offset = (ctx.string)(display_name, buffer, offset)
      let criteria_name = value.criteria_name
      offset = (ctx.string)(criteria_name, buffer, offset)
      let sort_order = value.sort_order
      offset = (ctx.zigzag32)(sort_order, buffer, offset)
      return offset
    },
    packet_set_score: (value, buffer, offset) => {
      let entries = value.entries
      offset = (ctx.ScoreEntries)(entries, buffer, offset)
      return offset
    },
    packet_lab_table: (value, buffer, offset) => {
      let useless_byte = value.useless_byte
      offset = (ctx.u8)(useless_byte, buffer, offset)
      let lab_table_x = value.lab_table_x
      offset = (ctx.varint)(lab_table_x, buffer, offset)
      let lab_table_y = value.lab_table_y
      offset = (ctx.varint)(lab_table_y, buffer, offset)
      let lab_table_z = value.lab_table_z
      offset = (ctx.varint)(lab_table_z, buffer, offset)
      let reaction_type = value.reaction_type
      offset = (ctx.u8)(reaction_type, buffer, offset)
      return offset
    },
    packet_update_block_synced: (value, buffer, offset) => {
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let block_runtime_id = value.block_runtime_id
      offset = (ctx.varint)(block_runtime_id, buffer, offset)
      let block_priority = value.block_priority
      offset = (ctx.varint)(block_priority, buffer, offset)
      let data_layer_id = value.data_layer_id
      offset = (ctx.varint)(data_layer_id, buffer, offset)
      let unknown0 = value.unknown0
      offset = (ctx.varint)(unknown0, buffer, offset)
      let unknown1 = value.unknown1
      offset = (ctx.varint)(unknown1, buffer, offset)
      return offset
    },
    packet_move_entity_delta: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint64)(runtime_entity_id, buffer, offset)
      let flags = value.flags
      offset = (ctx.DeltaMoveFlags)(flags, buffer, offset)
      let x = value.x
      offset = ((value, buffer, offset) => {
        switch (flags.has_x) {
          case true: return (ctx.lf32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(x, buffer, offset)
      let y = value.y
      offset = ((value, buffer, offset) => {
        switch (flags.has_y) {
          case true: return (ctx.lf32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(y, buffer, offset)
      let z = value.z
      offset = ((value, buffer, offset) => {
        switch (flags.has_z) {
          case true: return (ctx.lf32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(z, buffer, offset)
      let rot_x = value.rot_x
      offset = ((value, buffer, offset) => {
        switch (flags.has_rot_x) {
          case true: return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(rot_x, buffer, offset)
      let rot_y = value.rot_y
      offset = ((value, buffer, offset) => {
        switch (flags.has_rot_y) {
          case true: return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(rot_y, buffer, offset)
      let rot_z = value.rot_z
      offset = ((value, buffer, offset) => {
        switch (flags.has_rot_z) {
          case true: return (ctx.u8)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(rot_z, buffer, offset)
      return offset
    },
    packet_set_scoreboard_identity: (value, buffer, offset) => {
      let entries = value.entries
      offset = (ctx.ScoreboardIdentityEntries)(entries, buffer, offset)
      return offset
    },
    packet_set_local_player_as_initialized: (value, buffer, offset) => {
      let runtime_entity_id = value.runtime_entity_id
      offset = (ctx.varint64)(runtime_entity_id, buffer, offset)
      return offset
    },
    packet_update_soft_enum: (value, buffer, offset) => {
      return offset
    },
    packet_network_stack_latency: (value, buffer, offset) => {
      let timestamp = value.timestamp
      offset = (ctx.lu64)(timestamp, buffer, offset)
      let unknown_flag = value.unknown_flag
      offset = (ctx.u8)(unknown_flag, buffer, offset)
      return offset
    },
    packet_script_custom_event: (value, buffer, offset) => {
      let event_name = value.event_name
      offset = (ctx.string)(event_name, buffer, offset)
      let event_data = value.event_data
      offset = (ctx.string)(event_data, buffer, offset)
      return offset
    },
    packet_spawn_particle_effect: (value, buffer, offset) => {
      let dimension_id = value.dimension_id
      offset = (ctx.u8)(dimension_id, buffer, offset)
      let entity_id = value.entity_id
      offset = (ctx.zigzag64)(entity_id, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let particle_name = value.particle_name
      offset = (ctx.string)(particle_name, buffer, offset)
      return offset
    },
    packet_available_entity_identifiers: (value, buffer, offset) => {
      let nbt = value.nbt
      offset = (ctx.nbt)(nbt, buffer, offset)
      return offset
    },
    packet_level_sound_event_v2: (value, buffer, offset) => {
      let sound_id = value.sound_id
      offset = (ctx.u8)(sound_id, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let block_id = value.block_id
      offset = (ctx.zigzag32)(block_id, buffer, offset)
      let entity_type = value.entity_type
      offset = (ctx.string)(entity_type, buffer, offset)
      let is_baby_mob = value.is_baby_mob
      offset = (ctx.bool)(is_baby_mob, buffer, offset)
      let is_global = value.is_global
      offset = (ctx.bool)(is_global, buffer, offset)
      return offset
    },
    packet_network_chunk_publisher_update: (value, buffer, offset) => {
      let coordinates = value.coordinates
      offset = (ctx.BlockCoordinates)(coordinates, buffer, offset)
      let radius = value.radius
      offset = (ctx.varint)(radius, buffer, offset)
      return offset
    },
    packet_biome_definition_list: (value, buffer, offset) => {
      let nbt = value.nbt
      offset = (ctx.nbt)(nbt, buffer, offset)
      return offset
    },
    packet_level_sound_event: (value, buffer, offset) => {
      let sound_id = value.sound_id
      offset = (ctx.varint)(sound_id, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let block_id = value.block_id
      offset = (ctx.zigzag32)(block_id, buffer, offset)
      let entity_type = value.entity_type
      offset = (ctx.string)(entity_type, buffer, offset)
      let is_baby_mob = value.is_baby_mob
      offset = (ctx.bool)(is_baby_mob, buffer, offset)
      let is_global = value.is_global
      offset = (ctx.bool)(is_global, buffer, offset)
      return offset
    },
    packet_level_event_generic: (value, buffer, offset) => {
      let event_id = value.event_id
      offset = (ctx.varint)(event_id, buffer, offset)
      let nbt = value.nbt
      offset = (ctx.nbtLoop)(nbt, buffer, offset)
      return offset
    },
    packet_lectern_update: (value, buffer, offset) => {
      let page = value.page
      offset = (ctx.u8)(page, buffer, offset)
      let page_count = value.page_count
      offset = (ctx.u8)(page_count, buffer, offset)
      let position = value.position
      offset = (ctx.vec3i)(position, buffer, offset)
      let drop_book = value.drop_book
      offset = (ctx.bool)(drop_book, buffer, offset)
      return offset
    },
    packet_video_stream_connect: (value, buffer, offset) => {
      let server_uri = value.server_uri
      offset = (ctx.string)(server_uri, buffer, offset)
      let frame_send_frequency = value.frame_send_frequency
      offset = (ctx.lf32)(frame_send_frequency, buffer, offset)
      let action = value.action
      offset = (ctx.u8)(action, buffer, offset)
      let resolution_x = value.resolution_x
      offset = (ctx.li32)(resolution_x, buffer, offset)
      let resolution_y = value.resolution_y
      offset = (ctx.li32)(resolution_y, buffer, offset)
      return offset
    },
    packet_add_ecs_entity: (value, buffer, offset) => {
      let network_id = value.network_id
      offset = (ctx.varint64)(network_id, buffer, offset)
      return offset
    },
    packet_remove_ecs_entity: (value, buffer, offset) => {
      let network_id = value.network_id
      offset = (ctx.varint64)(network_id, buffer, offset)
      return offset
    },
    packet_client_cache_status: (value, buffer, offset) => {
      let enabled = value.enabled
      offset = (ctx.bool)(enabled, buffer, offset)
      return offset
    },
    packet_on_screen_texture_animation: (value, buffer, offset) => {
      return offset
    },
    packet_map_create_locked_copy: (value, buffer, offset) => {
      return offset
    },
    packet_structure_template_data_export_request: (value, buffer, offset) => {
      return offset
    },
    packet_structure_template_data_export_response: (value, buffer, offset) => {
      return offset
    },
    packet_update_block_properties: (value, buffer, offset) => {
      let nbt = value.nbt
      offset = (ctx.nbt)(nbt, buffer, offset)
      return offset
    },
    packet_client_cache_blob_status: (value, buffer, offset) => {
      let misses = value.misses
      offset = (ctx.varint)(misses, buffer, offset)
      let haves = value.haves
      offset = (ctx.varint)(haves, buffer, offset)
      let missing = value.missing
      offset = ((value, buffer, offset) => {
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.lu64)(value[i], buffer, offset)
        }
        return offset
      })(missing, buffer, offset)
      let have = value.have
      offset = ((value, buffer, offset) => {
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.lu64)(value[i], buffer, offset)
        }
        return offset
      })(have, buffer, offset)
      return offset
    },
    packet_client_cache_miss_response: (value, buffer, offset) => {
      let blobs = value.blobs
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.Blob)(value[i], buffer, offset)
        }
        return offset
      })(blobs, buffer, offset)
      return offset
    },
    packet_education_settings: (value, buffer, offset) => {
      let CodeBuilderDefaultURI = value.CodeBuilderDefaultURI
      offset = (ctx.string)(CodeBuilderDefaultURI, buffer, offset)
      let CodeBuilderTitle = value.CodeBuilderTitle
      offset = (ctx.string)(CodeBuilderTitle, buffer, offset)
      let CanResizeCodeBuilder = value.CanResizeCodeBuilder
      offset = (ctx.bool)(CanResizeCodeBuilder, buffer, offset)
      let HasOverrideURI = value.HasOverrideURI
      offset = (ctx.bool)(HasOverrideURI, buffer, offset)
      let OverrideURI = value.OverrideURI
      offset = ((value, buffer, offset) => {
        switch (HasOverrideURI) {
          case true: return (ctx.string)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(OverrideURI, buffer, offset)
      let HasQuiz = value.HasQuiz
      offset = (ctx.bool)(HasQuiz, buffer, offset)
      return offset
    },
    packet_multiplayer_settings: (value, buffer, offset) => {
      let action_type = value.action_type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"enable_multiplayer":0,"disable_multiplayer":1,"refresh_join_code":2}[value] || value, buffer, offset)
      })(action_type, buffer, offset)
      return offset
    },
    packet_settings_command: (value, buffer, offset) => {
      let command_line = value.command_line
      offset = (ctx.string)(command_line, buffer, offset)
      let suppress_output = value.suppress_output
      offset = (ctx.bool)(suppress_output, buffer, offset)
      return offset
    },
    packet_anvil_damage: (value, buffer, offset) => {
      let damage = value.damage
      offset = (ctx.u8)(damage, buffer, offset)
      let position = value.position
      offset = (ctx.BlockCoordinates)(position, buffer, offset)
      return offset
    },
    packet_completed_using_item: (value, buffer, offset) => {
      let used_item_id = value.used_item_id
      offset = (ctx.li16)(used_item_id, buffer, offset)
      let use_method = value.use_method
      offset = ((value, buffer, offset) => {
        return (ctx.li32)({"equip_armor":0,"eat":1,"attack":2,"consume":3,"throw":4,"shoot":5,"place":6,"fill_bottle":7,"fill_bucket":8,"pour_bucket":9,"use_tool":10,"interact":11,"retrieved":12,"dyed":13,"traded":14}[value] || value, buffer, offset)
      })(use_method, buffer, offset)
      return offset
    },
    packet_network_settings: (value, buffer, offset) => {
      let compression_threshold = value.compression_threshold
      offset = (ctx.u16)(compression_threshold, buffer, offset)
      return offset
    },
    packet_player_auth_input: (value, buffer, offset) => {
      let pitch = value.pitch
      offset = (ctx.lf32)(pitch, buffer, offset)
      let yaw = value.yaw
      offset = (ctx.lf32)(yaw, buffer, offset)
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let move_vector = value.move_vector
      offset = (ctx.vec2f)(move_vector, buffer, offset)
      let head_yaw = value.head_yaw
      offset = (ctx.lf32)(head_yaw, buffer, offset)
      let input_data = value.input_data
      offset = (ctx.InputFlag)(input_data, buffer, offset)
      let input_mode = value.input_mode
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"mouse":0,"touch":1,"game_pad":2,"motion_controller":3}[value] || value, buffer, offset)
      })(input_mode, buffer, offset)
      let play_mode = value.play_mode
      offset = ((value, buffer, offset) => {
        return (ctx.varint)({"normal":0,"teaser":1,"screen":2,"viewer":3,"reality":4,"placement":5,"living_room":6,"exit_level":7,"exit_level_living_room":8,"num_modes":9}[value] || value, buffer, offset)
      })(play_mode, buffer, offset)
      let gaze_direction = value.gaze_direction
      offset = ((value, buffer, offset) => {
        switch (play_mode) {
          case "reality": return (ctx.vec3f)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(gaze_direction, buffer, offset)
      let tick = value.tick
      offset = (ctx.varint64)(tick, buffer, offset)
      let delta = value.delta
      offset = (ctx.vec3f)(delta, buffer, offset)
      return offset
    },
    packet_creative_content: (value, buffer, offset) => {
      let items = value.items
      offset = (ctx.ItemStacks)(items, buffer, offset)
      return offset
    },
    packet_player_enchant_options: (value, buffer, offset) => {
      let enchant_options = value.enchant_options
      offset = (ctx.EnchantOptions)(enchant_options, buffer, offset)
      return offset
    },
    packet_item_stack_request: (value, buffer, offset) => {
      let requests = value.requests
      offset = (ctx.ItemStackRequests)(requests, buffer, offset)
      return offset
    },
    packet_item_stack_response: (value, buffer, offset) => {
      let responses = value.responses
      offset = (ctx.ItemStackResponses)(responses, buffer, offset)
      return offset
    },
    packet_player_armor_damage: (value, buffer, offset) => {
      let type = value.type
      offset = (ctx.ArmorDamageType)(type, buffer, offset)
      let helmet_damage = value.helmet_damage
      offset = ((value, buffer, offset) => {
        switch (type.head) {
          case true: return (ctx.zigzag32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(helmet_damage, buffer, offset)
      let chestplate_damage = value.chestplate_damage
      offset = ((value, buffer, offset) => {
        switch (type.chest) {
          case true: return (ctx.zigzag32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(chestplate_damage, buffer, offset)
      let leggings_damage = value.leggings_damage
      offset = ((value, buffer, offset) => {
        switch (type.legs) {
          case true: return (ctx.zigzag32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(leggings_damage, buffer, offset)
      let boots_damage = value.boots_damage
      offset = ((value, buffer, offset) => {
        switch (types.feet) {
          case true: return (ctx.zigzag32)(value, buffer, offset)
          default: return (ctx.void)(value, buffer, offset)
        }
      })(boots_damage, buffer, offset)
      return offset
    },
    packet_update_player_game_type: (value, buffer, offset) => {
      let gamemode = value.gamemode
      offset = (ctx.GameMode)(gamemode, buffer, offset)
      let player_unique_id = value.player_unique_id
      offset = (ctx.zigzag64)(player_unique_id, buffer, offset)
      return offset
    },
    packet_position_tracking_db_request: (value, buffer, offset) => {
      let action = value.action
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"query":0}[value] || value, buffer, offset)
      })(action, buffer, offset)
      let tracking_id = value.tracking_id
      offset = (ctx.zigzag32)(tracking_id, buffer, offset)
      return offset
    },
    packet_position_tracking_db_broadcast: (value, buffer, offset) => {
      let broadcast_action = value.broadcast_action
      offset = ((value, buffer, offset) => {
        return (ctx.u8)({"update":0,"destory":1,"not_found":2}[value] || value, buffer, offset)
      })(broadcast_action, buffer, offset)
      let tracking_id = value.tracking_id
      offset = (ctx.zigzag32)(tracking_id, buffer, offset)
      let nbt = value.nbt
      offset = (ctx.nbt)(nbt, buffer, offset)
      return offset
    },
    packet_packet_violation_warning: (value, buffer, offset) => {
      let violation_type = value.violation_type
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"malformed":0}[value] || value, buffer, offset)
      })(violation_type, buffer, offset)
      let severity = value.severity
      offset = ((value, buffer, offset) => {
        return (ctx.zigzag32)({"warning":0,"final_warning":1,"terminating":2}[value] || value, buffer, offset)
      })(severity, buffer, offset)
      let packet_id = value.packet_id
      offset = (ctx.zigzag32)(packet_id, buffer, offset)
      let reason = value.reason
      offset = (ctx.string)(reason, buffer, offset)
      return offset
    },
    packet_motion_prediction_hints: (value, buffer, offset) => {
      let entity_runtime_id = value.entity_runtime_id
      offset = (ctx.varint64)(entity_runtime_id, buffer, offset)
      let velocity = value.velocity
      offset = (ctx.vec3f)(velocity, buffer, offset)
      let on_ground = value.on_ground
      offset = (ctx.bool)(on_ground, buffer, offset)
      return offset
    },
    packet_animate_entity: (value, buffer, offset) => {
      let animation = value.animation
      offset = (ctx.string)(animation, buffer, offset)
      let next_state = value.next_state
      offset = (ctx.string)(next_state, buffer, offset)
      let stop_condition = value.stop_condition
      offset = (ctx.string)(stop_condition, buffer, offset)
      let controller = value.controller
      offset = (ctx.string)(controller, buffer, offset)
      let blend_out_time = value.blend_out_time
      offset = (ctx.lf32)(blend_out_time, buffer, offset)
      let runtime_entity_ids = value.runtime_entity_ids
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.varint64)(value[i], buffer, offset)
        }
        return offset
      })(runtime_entity_ids, buffer, offset)
      return offset
    },
    packet_camera_shake: (value, buffer, offset) => {
      let intensity = value.intensity
      offset = (ctx.lf32)(intensity, buffer, offset)
      let duration = value.duration
      offset = (ctx.lf32)(duration, buffer, offset)
      let type = value.type
      offset = (ctx.u8)(type, buffer, offset)
      return offset
    },
    packet_player_fog: (value, buffer, offset) => {
      let stack = value.stack
      offset = ((value, buffer, offset) => {
        offset = (ctx.varint)(value.length, buffer, offset)
        for (let i = 0; i < value.length; i++) {
          offset = (ctx.string)(value[i], buffer, offset)
        }
        return offset
      })(stack, buffer, offset)
      return offset
    },
    packet_correct_player_move_prediction: (value, buffer, offset) => {
      let position = value.position
      offset = (ctx.vec3f)(position, buffer, offset)
      let delta = value.delta
      offset = (ctx.vec3f)(delta, buffer, offset)
      let on_ground = value.on_ground
      offset = (ctx.bool)(on_ground, buffer, offset)
      let tick = value.tick
      offset = (ctx.varint64)(tick, buffer, offset)
      return offset
    },
    packet_item_component: (value, buffer, offset) => {
      let entries = value.entries
      offset = (ctx.ItemComponentList)(entries, buffer, offset)
      return offset
    },
    packet_filter_text_packet: (value, buffer, offset) => {
      let text = value.text
      offset = (ctx.string)(text, buffer, offset)
      let from_server = value.from_server
      offset = (ctx.bool)(from_server, buffer, offset)
      return offset
    },
    string: (value, buffer, offset) => {
      const length = Buffer.byteLength(value, 'utf8')
      offset = (ctx.varint)(length, buffer, offset)
      buffer.write(value, offset, length, 'utf8')
      return offset + length
    },
    ByteArray: (value, buffer, offset) => {
      if (!(value instanceof Buffer)) value = Buffer.from(value)
      offset = (ctx.varint)(value.length, buffer, offset)
      value.copy(buffer, offset)
      return offset + value.length
    },
    SignedByteArray: (value, buffer, offset) => {
      if (!(value instanceof Buffer)) value = Buffer.from(value)
      offset = (ctx.zigzag32)(value.length, buffer, offset)
      value.copy(buffer, offset)
      return offset + value.length
    },
    LittleString: (value, buffer, offset) => {
      const length = Buffer.byteLength(value, 'utf8')
      offset = (ctx.li32)(length, buffer, offset)
      buffer.write(value, offset, length, 'utf8')
      return offset + length
    },
    AdventureFlags: (value, buffer, offset) => {
      const flags = {"world_immutable":1,"no_pvp":2,"auto_jump":32,"allow_flight":64,"no_clip":128,"world_builder":256,"flying":512,"muted":1024}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val, buffer, offset)
    },
    ActionPermissions: (value, buffer, offset) => {
      const flags = {"build_and_mine":65537,"doors_and_switches":65538,"open_containers":65540,"attack_players":65544,"attack_mobs":65552,"operator":65568,"teleport":65664}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val, buffer, offset)
    },
    CommandFlags: (value, buffer, offset) => {
      let unused = value.unused
      let has_semantic_constraint = value.has_semantic_constraint
      let collapse_enum = value.collapse_enum
      buffer[offset++] = ((((((unused >> 0) & 0x3f)) << 1) | ((has_semantic_constraint >> 0) & 0x1)) << 1) | ((collapse_enum >> 0) & 0x1)
      return offset
    },
    DeltaMoveFlags: (value, buffer, offset) => {
      const flags = {"has_x":1,"has_y":2,"has_z":4,"has_rot_x":8,"has_rot_y":16,"has_rot_z":32,"on_ground":64,"teleport":128,"force_move":256}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.lu16)(val, buffer, offset)
    },
    InputFlag: (value, buffer, offset) => {
      const flags = {"ascend":1,"descend":2,"north_jump":4,"jump_down":8,"sprint_down":16,"change_height":32,"jumping":64,"auto_jumping_in_water":128,"sneaking":256,"sneak_down":512,"up":1024,"down":2048,"left":4096,"right":8192,"up_left":16384,"up_right":32768,"want_up":65536,"want_down":131072,"want_down_slow":262144,"want_up_slow":524288,"sprinting":1048576,"ascend_scaffolding":2097152,"descend_scaffolding":4194304,"sneak_toggle_down":8388608,"persist_sneak":16777216}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.varint)(val, buffer, offset)
    },
    ArmorDamageType: (value, buffer, offset) => {
      const flags = {"head":1,"chest":2,"legs":4,"feet":8}
          let val = value._value 
          for (const key in flags) {
            if (value[key]) val |= flags[key]
          }
          return (ctx.u8)(val, buffer, offset)
    }
  }
  return ctx
}